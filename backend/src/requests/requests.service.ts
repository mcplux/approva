import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto, FilterRequestDto, UpdateRequestDto } from './dto';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
  ) {}

  logger = new Logger('RequestsService');

  async create(createRequestDto: CreateRequestDto, user: User) {
    const request = this.requestsRepository.create({
      ...createRequestDto,
      createdBy: user,
    });

    try {
      await this.requestsRepository.save(request);
      return request;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findMany(filterRequestDto: FilterRequestDto, user: User) {
    const { limit = 20, offset = 0, mine } = filterRequestDto;

    const qb = this.requestsRepository.createQueryBuilder('request');
    qb.leftJoinAndSelect('request.createdBy', 'createdBy');

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
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    if (user.userRole === UserRole.USER) {
      if (request.createdBy.id !== user.id) {
        throw new ForbiddenException(`Forbidden request`);
      }
    }

    return request;
  }

  update(id: number, updateRequestDto: UpdateRequestDto, user: User) {
    return {
      id,
      updateRequestDto,
      user,
    };
  }

  async remove(id: number, user: User) {
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    if (request.createdBy.id !== user.id) {
      throw new ForbiddenException('User cannot delete this request');
    }

    await this.requestsRepository.remove(request);
  }
}
