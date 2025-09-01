import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('pots')
@Controller('pots')
export class PotsController {
  @Get()
  @ApiOperation({ summary: 'Get all pots for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of pots',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'Savings' },
              target_amount: { type: 'number', example: 2000.00 },
              total_saved: { type: 'number', example: 159.00 },
              theme_color: { type: 'string', example: '#277C78' },
            },
          },
        },
      },
    },
  })
  async getPots() {
    // TODO: Implement pot retrieval logic
    const mockPots = [
      {
        id: '1',
        name: 'Savings',
        target_amount: 2000.00,
        total_saved: 159.00,
        theme_color: '#277C78',
      },
      {
        id: '2',
        name: 'Concert Ticket',
        target_amount: 150.00,
        total_saved: 110.00,
        theme_color: '#F2CDAC',
      },
      {
        id: '3',
        name: 'Gift',
        target_amount: 60.00,
        total_saved: 40.00,
        theme_color: '#82C9D7',
      },
    ];

    return {
      success: true,
      data: mockPots,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific pot by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Pot ID' })
  @ApiResponse({
    status: 200,
    description: 'Pot details',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Savings' },
            target_amount: { type: 'number', example: 2000.00 },
            total_saved: { type: 'number', example: 159.00 },
            theme_color: { type: 'string', example: '#277C78' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Pot not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Pot not found' },
          },
        },
      },
    },
  })
  async getPot(@Param('id') id: string) {
    // TODO: Implement single pot retrieval logic
    const mockPot = {
      id,
      name: 'Savings',
      target_amount: 2000.00,
      total_saved: 159.00,
      theme_color: '#277C78',
    };

    return {
      success: true,
      data: mockPot,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new pot' })
  @ApiResponse({
    status: 201,
    description: 'Pot created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'New Savings Goal' },
            target_amount: { type: 'number', example: 1000.00 },
            total_saved: { type: 'number', example: 0.00 },
            theme_color: { type: 'string', example: '#277C78' },
          },
        },
      },
    },
  })
  async createPot(@Body() createPotDto: any) {
    // TODO: Implement pot creation logic
    const mockPot = {
      id: Math.random().toString(36).substr(2, 9),
      ...createPotDto,
      total_saved: 0.00,
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockPot,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing pot' })
  @ApiParam({ name: 'id', type: 'string', description: 'Pot ID' })
  @ApiResponse({
    status: 200,
    description: 'Pot updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Updated Savings Goal' },
            target_amount: { type: 'number', example: 1500.00 },
            total_saved: { type: 'number', example: 159.00 },
            theme_color: { type: 'string', example: '#277C78' },
          },
        },
      },
    },
  })
  async updatePot(
    @Param('id') id: string,
    @Body() updatePotDto: any,
  ) {
    // TODO: Implement pot update logic
    const mockPot = {
      id,
      ...updatePotDto,
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockPot,
    };
  }

  @Post(':id/add')
  @ApiOperation({ summary: 'Add money to a pot' })
  @ApiParam({ name: 'id', type: 'string', description: 'Pot ID' })
  @ApiResponse({
    status: 200,
    description: 'Money added to pot successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Savings' },
            target_amount: { type: 'number', example: 2000.00 },
            total_saved: { type: 'number', example: 209.00 },
            theme_color: { type: 'string', example: '#277C78' },
          },
        },
      },
    },
  })
  async addToPot(
    @Param('id') id: string,
    @Body() addMoneyDto: { amount: number },
  ) {
    // TODO: Implement add money to pot logic
    const mockPot = {
      id,
      name: 'Savings',
      target_amount: 2000.00,
      total_saved: 159.00 + addMoneyDto.amount,
      theme_color: '#277C78',
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockPot,
    };
  }

  @Post(':id/withdraw')
  @ApiOperation({ summary: 'Withdraw money from a pot' })
  @ApiParam({ name: 'id', type: 'string', description: 'Pot ID' })
  @ApiResponse({
    status: 200,
    description: 'Money withdrawn from pot successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Savings' },
            target_amount: { type: 'number', example: 2000.00 },
            total_saved: { type: 'number', example: 109.00 },
            theme_color: { type: 'string', example: '#277C78' },
          },
        },
      },
    },
  })
  async withdrawFromPot(
    @Param('id') id: string,
    @Body() withdrawMoneyDto: { amount: number },
  ) {
    // TODO: Implement withdraw money from pot logic
    const mockPot = {
      id,
      name: 'Savings',
      target_amount: 2000.00,
      total_saved: Math.max(0, 159.00 - withdrawMoneyDto.amount),
      theme_color: '#277C78',
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockPot,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a pot' })
  @ApiParam({ name: 'id', type: 'string', description: 'Pot ID' })
  @ApiResponse({
    status: 204,
    description: 'Pot deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Pot not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Pot not found' },
          },
        },
      },
    },
  })
  async deletePot(@Param('id') id: string) {
    // TODO: Implement pot deletion logic
    // Return nothing for 204 status
  }
}