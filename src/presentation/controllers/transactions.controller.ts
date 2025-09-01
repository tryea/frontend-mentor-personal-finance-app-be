import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  @Get()
  @ApiOperation({ summary: 'Get all transactions with optional filtering and pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category name' })
  @ApiQuery({ name: 'sort', required: false, enum: ['latest', 'oldest', 'highest', 'lowest', 'a_to_z', 'z_to_a'], description: 'Sort order' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in transaction names' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            transactions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '1' },
                  name: { type: 'string', example: 'Coffee Shop' },
                  category: { type: 'string', example: 'Dining Out' },
                  transaction_date: { type: 'string', example: '2024-01-15T10:30:00Z' },
                  amount: { type: 'number', example: -4.50 },
                  recurring: { type: 'boolean', example: false },
                },
              },
            },
            pagination: {
              type: 'object',
              properties: {
                current_page: { type: 'number', example: 1 },
                per_page: { type: 'number', example: 10 },
                total: { type: 'number', example: 50 },
                total_pages: { type: 'number', example: 5 },
              },
            },
          },
        },
      },
    },
  })
  async getTransactions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
  ) {
    // TODO: Implement transaction retrieval logic
    const mockTransactions = [
      {
        id: '1',
        name: 'Coffee Shop',
        category: 'Dining Out',
        transaction_date: '2024-01-15T10:30:00Z',
        amount: -4.50,
        recurring: false,
      },
      {
        id: '2',
        name: 'Salary',
        category: 'Income',
        transaction_date: '2024-01-01T00:00:00Z',
        amount: 3000.00,
        recurring: true,
      },
    ];

    return {
      success: true,
      data: {
        transactions: mockTransactions,
        pagination: {
          current_page: page,
          per_page: limit,
          total: 50,
          total_pages: Math.ceil(50 / limit),
        },
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific transaction by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction details',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Coffee Shop' },
            category: { type: 'string', example: 'Dining Out' },
            transaction_date: { type: 'string', example: '2024-01-15T10:30:00Z' },
            amount: { type: 'number', example: -4.50 },
            recurring: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Transaction not found' },
          },
        },
      },
    },
  })
  async getTransaction(@Param('id') id: string) {
    // TODO: Implement single transaction retrieval logic
    const mockTransaction = {
      id,
      name: 'Coffee Shop',
      category: 'Dining Out',
      transaction_date: '2024-01-15T10:30:00Z',
      amount: -4.50,
      recurring: false,
    };

    return {
      success: true,
      data: mockTransaction,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Coffee Shop' },
            category: { type: 'string', example: 'Dining Out' },
            transaction_date: { type: 'string', example: '2024-01-15T10:30:00Z' },
            amount: { type: 'number', example: -4.50 },
            recurring: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  async createTransaction(@Body() createTransactionDto: any) {
    // TODO: Implement transaction creation logic
    const mockTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      ...createTransactionDto,
      transaction_date: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockTransaction,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing transaction' })
  @ApiParam({ name: 'id', type: 'string', description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Updated Coffee Shop' },
            category: { type: 'string', example: 'Dining Out' },
            transaction_date: { type: 'string', example: '2024-01-15T10:30:00Z' },
            amount: { type: 'number', example: -5.00 },
            recurring: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: any,
  ) {
    // TODO: Implement transaction update logic
    const mockTransaction = {
      id,
      ...updateTransactionDto,
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockTransaction,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', type: 'string', description: 'Transaction ID' })
  @ApiResponse({
    status: 204,
    description: 'Transaction deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Transaction not found' },
          },
        },
      },
    },
  })
  async deleteTransaction(@Param('id') id: string) {
    // TODO: Implement transaction deletion logic
    // Return nothing for 204 status
  }
}