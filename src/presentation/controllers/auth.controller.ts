import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { RegisterDto } from '../../application/dtos/auth/register.dto';
import { LoginDto } from '../../application/dtos/auth/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1' },
                email: { type: 'string', example: 'user@example.com' },
                name: { type: 'string', example: 'John Doe' },
                avatar_url: { type: 'string', nullable: true, example: null },
                created_at: { type: 'string', example: '2024-01-01T00:00:00Z' },
                updated_at: { type: 'string', example: '2024-01-01T00:00:00Z' },
              },
            },
            session_id: { type: 'string', example: 'session_123' },
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
                  field: { type: 'string', example: 'email' },
                  message: { type: 'string', example: 'Please provide a valid email address' },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'CONFLICT' },
            message: { type: 'string', example: 'User already exists' },
          },
        },
      },
    },
  })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // TODO: Implement user registration logic
    // This is a placeholder implementation
    const mockUser = {
      id: '1',
      email: registerDto.email,
      name: registerDto.name,
      avatar_url: registerDto.avatar_url || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

    // Set session cookie
    response.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return {
      success: true,
      data: {
        user: mockUser,
        session_id: sessionId,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and create session' })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1' },
                email: { type: 'string', example: 'user@example.com' },
                name: { type: 'string', example: 'John Doe' },
                avatar_url: { type: 'string', nullable: true, example: null },
              },
            },
            session_id: { type: 'string', example: 'session_123' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'UNAUTHORIZED' },
            message: { type: 'string', example: 'Invalid credentials' },
          },
        },
      },
    },
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // TODO: Implement user authentication logic
    // This is a placeholder implementation
    const mockUser = {
      id: '1',
      email: loginDto.email,
      name: 'John Doe',
      avatar_url: null,
    };

    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

    // Set session cookie
    response.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return {
      success: true,
      data: {
        user: mockUser,
        session_id: sessionId,
      },
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate current session and clear session cookie' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Successfully logged out' },
      },
    },
  })
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear session cookie
    response.cookie('session_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });

    return {
      success: true,
      message: 'Successfully logged out',
    };
  }
}