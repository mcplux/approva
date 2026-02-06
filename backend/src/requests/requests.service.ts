import { Injectable, Logger } from '@nestjs/common';
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

  async create(user: User, createRequestDto: CreateRequestDto) {
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

  async findAll(user: User, filterRequestDto: FilterRequestDto) {
    const reviewers = [UserRole.REVIEWER, UserRole.ADMIN];
    if (reviewers.includes(user.userRole)) {
      const where = filterRequestDto.mine ? { createdBy: { id: user.id } } : {};
      return this.requestsRepository.find({ where });
    }
    const requests = await this.requestsRepository.find({
      where: { createdBy: { id: user.id } },
    });

    return requests;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
