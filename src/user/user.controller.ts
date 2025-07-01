import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Get,
  Req,
  Res,
  UsePipes,
  HttpException,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // list ************************************
  @ApiOperation({
    summary: 'لیست کاربران ',
    operationId: 'userSignin',
  })
  @ApiNotFoundResponse({ description: 'NOT_ACCEPTABLE' })
  @ApiInternalServerErrorResponse({
    description: 'signin faild',
  })
  @Get('all')
  @HttpCode(HttpStatus.OK)
  async login() {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw err;
    }
  }
  // findOne ****************************************************
  @Get(':id')
  @ApiOperation({
    summary: 'findOne',
  })
  @ApiInternalServerErrorResponse({
    description: 'login faild',
  })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      throw err;
    }
  }
  // create ****************************************************
  @Post('create')
  @ApiOperation({
    summary: 'create',
    operationId: 'create',
  })
  @ApiNotFoundResponse({ description: 'update user filed' })
  @ApiInternalServerErrorResponse({
    description: 'login faild',
  })
  async updateProfile(@Body() data): Promise<boolean> {
    try {
      const result = await this.userService.create({
        firstName: new Date().toISOString(),
        lastName: new Date().toISOString(),
        email: new Date().toISOString() + '@example.com',
        isActive: true,
        ...data,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  // update ********************************************************
  @ApiOkResponse({
    description: 'update',
    type: Boolean,
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() data,
  ): Promise<boolean> {
    try {
      const result = await this.userService.update(id, data);
      return result;
    } catch (err) {
      throw err;
    }
  }
  // delete ********************************************************
  @ApiOperation({
    summary: 'delete',
    operationId: 'delete',
  })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiInternalServerErrorResponse({
    description: 'delete failed',
  })
  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<boolean> {
    try {
      const result = await this.userService.remove(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
