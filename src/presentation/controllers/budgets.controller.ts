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

@ApiTags('budgets')
@Controller('budgets')
export class BudgetsController {
  @Get()
  @ApiOperation({ summary: 'Get all budgets for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of budgets',
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
              category: { type: 'string', example: 'Entertainment' },
              maximum_amount: { type: 'number', example: 50.00 },
              theme_color: { type: 'string', example: '#277C78' },
              spent: { type: 'number', example: 25.00 },
              remaining: { type: 'number', example: 25.00 },
              latest_spending: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Movie Tickets' },
                    amount: { type: 'number', example: -15.00 },
                    date: { type: 'string', example: '2024-01-15T19:30:00Z' },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getBudgets() {
    // TODO: Implement budget retrieval logic
    const mockBudgets = [
      {
        id: '1',
        category: 'Entertainment',
        maximum_amount: 50.00,
        theme_color: '#277C78',
        spent: 25.00,
        remaining: 25.00,
        latest_spending: [
          {
            name: 'Movie Tickets',
            amount: -15.00,
            date: '2024-01-15T19:30:00Z',
          },
          {
            name: 'Concert',
            amount: -10.00,
            date: '2024-01-10T20:00:00Z',
          },
        ],
      },
      {
        id: '2',
        category: 'Bills',
        maximum_amount: 750.00,
        theme_color: '#82C9D7',
        spent: 250.00,
        remaining: 500.00,
        latest_spending: [
          {
            name: 'Electric Bill',
            amount: -100.00,
            date: '2024-01-01T00:00:00Z',
          },
        ],
      },
    ];

    return {
      success: true,
      data: mockBudgets,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific budget by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Budget ID' })
  @ApiResponse({
    status: 200,
    description: 'Budget details',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            category: { type: 'string', example: 'Entertainment' },
            maximum_amount: { type: 'number', example: 50.00 },
            theme_color: { type: 'string', example: '#277C78' },
            spent: { type: 'number', example: 25.00 },
            remaining: { type: 'number', example: 25.00 },
            latest_spending: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Movie Tickets' },
                  amount: { type: 'number', example: -15.00 },
                  date: { type: 'string', example: '2024-01-15T19:30:00Z' },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Budget not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Budget not found' },
          },
        },
      },
    },
  })
  async getBudget(@Param('id') id: string) {
    // TODO: Implement single budget retrieval logic
    const mockBudget = {
      id,
      category: 'Entertainment',
      maximum_amount: 50.00,
      theme_color: '#277C78',
      spent: 25.00,
      remaining: 25.00,
      latest_spending: [
        {
          name: 'Movie Tickets',
          amount: -15.00,
          date: '2024-01-15T19:30:00Z',
        },
      ],
    };

    return {
      success: true,
      data: mockBudget,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new budget' })
  @ApiResponse({
    status: 201,
    description: 'Budget created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            category: { type: 'string', example: 'Entertainment' },
            maximum_amount: { type: 'number', example: 50.00 },
            theme_color: { type: 'string', example: '#277C78' },
            spent: { type: 'number', example: 0.00 },
            remaining: { type: 'number', example: 50.00 },
          },
        },
      },
    },
  })
  async createBudget(@Body() createBudgetDto: any) {
    // TODO: Implement budget creation logic
    const mockBudget = {
      id: Math.random().toString(36).substr(2, 9),
      ...createBudgetDto,
      spent: 0.00,
      remaining: createBudgetDto.maximum_amount,
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockBudget,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing budget' })
  @ApiParam({ name: 'id', type: 'string', description: 'Budget ID' })
  @ApiResponse({
    status: 200,
    description: 'Budget updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            category: { type: 'string', example: 'Entertainment' },
            maximum_amount: { type: 'number', example: 75.00 },
            theme_color: { type: 'string', example: '#277C78' },
            spent: { type: 'number', example: 25.00 },
            remaining: { type: 'number', example: 50.00 },
          },
        },
      },
    },
  })
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: any,
  ) {
    // TODO: Implement budget update logic
    const mockBudget = {
      id,
      ...updateBudgetDto,
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockBudget,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a budget' })
  @ApiParam({ name: 'id', type: 'string', description: 'Budget ID' })
  @ApiResponse({
    status: 204,
    description: 'Budget deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Budget not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Budget not found' },
          },
        },
      },
    },
  })
  async deleteBudget(@Param('id') id: string) {
    // TODO: Implement budget deletion logic
    // Return nothing for 204 status
  }
}