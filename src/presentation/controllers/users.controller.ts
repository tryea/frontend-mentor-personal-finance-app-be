import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile information' })
  @ApiResponse({
    status: 200,
    description: 'User profile information',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            email: { type: 'string', example: 'user@example.com' },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            avatar_url: { type: 'string', nullable: true, example: null },
            created_at: { type: 'string', example: '2024-01-01T00:00:00Z' },
            updated_at: { type: 'string', example: '2024-01-01T00:00:00Z' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing session',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'UNAUTHORIZED' },
            message: { type: 'string', example: 'Authentication required' },
          },
        },
      },
    },
  })
  async getProfile() {
    // TODO: Implement get user profile logic
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar_url: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    return {
      success: true,
      data: mockUser,
    };
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile information' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            email: { type: 'string', example: 'user@example.com' },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            avatar_url: { type: 'string', nullable: true, example: 'https://example.com/avatar.jpg' },
            updated_at: { type: 'string', example: '2024-01-15T10:30:00Z' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'VALIDATION_ERROR' },
            message: { type: 'string', example: 'Validation failed' },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', example: 'first_name' },
                  message: { type: 'string', example: 'First name must not exceed 100 characters' },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing session',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'UNAUTHORIZED' },
            message: { type: 'string', example: 'Authentication required' },
          },
        },
      },
    },
  })
  async updateProfile(@Body() updateProfileDto: any) {
    // TODO: Implement update user profile logic
    const mockUpdatedUser = {
      id: '1',
      email: 'user@example.com',
      ...updateProfileDto,
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: mockUpdatedUser,
    };
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get current user balance information' })
  @ApiResponse({
    status: 200,
    description: 'User balance information',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            current_balance: { type: 'number', example: 4836.00 },
            income: { type: 'number', example: 3814.25 },
            expenses: { type: 'number', example: 1700.50 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing session',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'UNAUTHORIZED' },
            message: { type: 'string', example: 'Authentication required' },
          },
        },
      },
    },
  })
  async getBalance() {
    // TODO: Implement get user balance logic
    const mockBalance = {
      current_balance: 4836.00,
      income: 3814.25,
      expenses: 1700.50,
    };

    return {
      success: true,
      data: mockBalance,
    };
  }
}