import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import {
  CreateRequestDto,
  FilterRequestDto,
  UpdateRequestDto,
  UpdateRequestStatusDto,
} from './dto';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { Request } from './entities/request.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
    private readonly autService: AuthService,
  ) {}

  logger = new Logger('RequestsService');

  async create(createRequestDto: CreateRequestDto, user: User) {
    const request = this.requestsRepository.create({
      ...createRequestDto,
      createdBy: user,
    });
    const newRequest = await this.requestsRepository.save(request);

    return this.mapRequestResponse(newRequest);
  }

  async findMany(filterRequestDto: FilterRequestDto, user: User) {
    const { limit = 20, offset = 0, mine } = filterRequestDto;

    const qb = this.requestsRepository.createQueryBuilder('request');
    qb.leftJoin('request.createdBy', 'createdBy');
    qb.select([
      'request',
      'createdBy.id',
      'createdBy.email',
      'createdBy.fullName',
      'createdBy.userRole',
    ]);

    if (user.userRole === UserRole.USER) {
      // "user" only their requests
      qb.andWhere('createdBy.id = :userId', { userId: user.id });
    } else {
      // Any other role retrieve all request by default or their requests if mine is active
      if (mine) {
        qb.andWhere('createdBy.id = :userId', { userId: user.id });
      }
    }

    qb.take(limit).offset(offset);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async findOne(id: number, user: User) {
    const request = await this.findByIdOrFail(id);

    if (user.userRole === UserRole.USER) {
      if (request.createdBy.id !== user.id) {
        throw new ForbiddenException('User cannot retrieve this request');
      }
    }

    return this.mapRequestResponse(request);
  }

  async update(id: number, updateRequestDto: UpdateRequestDto, user: User) {
    const request = await this.findByIdOrFail(id);

    if (request.createdBy.id !== user.id) {
      throw new ForbiddenException('User cannot update this request');
    }

    Object.assign(request, updateRequestDto);

    const updatedRequest = await this.requestsRepository.save(request);

    return this.mapRequestResponse(updatedRequest);
  }

  async remove(id: number, user: User) {
    const request = await this.findByIdOrFail(id);

    if (request.createdBy.id !== user.id) {
      throw new ForbiddenException('User cannot delete this request');
    }

    await this.requestsRepository.remove(request);
  }

  async updateStatus(
    id: number,
    updateRequestStatusDto: UpdateRequestStatusDto,
    user: User,
  ) {
    const request = await this.findByIdOrFail(id);

    if (request.createdBy.id === user.id) {
      throw new ForbiddenException('User cannot update their own request');
    }

    // Validate hierarchy
    const roleHierarchy = {
      [UserRole.USER]: 0,
      [UserRole.REVIEWER]: 1,
      [UserRole.ADMIN]: 2,
    };

    const ownerHierarchy = roleHierarchy[request.createdBy.userRole];
    const reviewerHierarchy = roleHierarchy[user.userRole];

    if (ownerHierarchy > reviewerHierarchy) {
      throw new ForbiddenException(
        'User cannot review requests from higher roles',
      );
    }

    // Update request
    request.status = updateRequestStatusDto.status;
    const updatedRequest = await this.requestsRepository.save(request);

    return this.mapRequestResponse(updatedRequest);
  }

  private mapRequestResponse(request: Request) {
    return {
      ...request,
      createdBy: this.autService.getUser(request.createdBy),
    };
  }

  private async findByIdOrFail(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    return request;
  }
}
