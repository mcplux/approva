import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto, FilterRequestDto, UpdateRequestDto } from './dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Auth()
  @Post()
  create(@GetUser() user: User, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(user, createRequestDto);
  }

  @Auth()
  @Get()
  findAll(@GetUser() user: User, @Query() filterRequestDto: FilterRequestDto) {
    return this.requestsService.findAll(user, filterRequestDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
