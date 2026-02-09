import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
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
  create(@Body() createRequestDto: CreateRequestDto, @GetUser() user: User) {
    return this.requestsService.create(createRequestDto, user);
  }

  @Auth()
  @Get()
  findAll(@Query() filterRequestDto: FilterRequestDto, @GetUser() user: User) {
    return this.requestsService.findMany(filterRequestDto, user);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.requestsService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequestDto: UpdateRequestDto,
    @GetUser() user: User,
  ) {
    return this.requestsService.update(+id, updateRequestDto, user);
  }

  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.requestsService.remove(id, user);
  }
}
