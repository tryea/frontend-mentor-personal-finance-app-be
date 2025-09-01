import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  @Get('overview')
  @ApiOperation({ summary: 'Get dashboard overview with current balance, income, expenses, and summary data' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard overview data',
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
            pots: {
              type: 'object',
              properties: {
                total_saved: { type: 'number', example: 850.00 },
                pots: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      name: { type: 'string', example: 'Savings' },
                      total_saved: { type: 'number', example: 159.00 },
                      theme_color: { type: 'string', example: '#277C78' },
                    },
                  },
                },
              },
            },
            budgets: {
              type: 'object',
              properties: {
                budgets: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      category: { type: 'string', example: 'Entertainment' },
                      maximum_amount: { type: 'number', example: 50.00 },
                      theme_color: { type: 'string', example: '#277C78' },
                      spent: { type: 'number', example: 25.00 },
                    },
                  },
                },
              },
            },
            transactions: {
              type: 'object',
              properties: {
                recent_transactions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      name: { type: 'string', example: 'Coffee Shop' },
                      category: { type: 'string', example: 'Dining Out' },
                      transaction_date: { type: 'string', example: '2024-01-15T10:30:00Z' },
                      amount: { type: 'number', example: -4.50 },
                    },
                  },
                },
              },
            },
            recurring_bills: {
              type: 'object',
              properties: {
                total_bills: { type: 'number', example: 384.00 },
                paid_bills: { type: 'number', example: 190.00 },
                upcoming_bills: { type: 'number', example: 194.00 },
                due_soon: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      name: { type: 'string', example: 'Electric Bill' },
                      amount: { type: 'number', example: -100.00 },
                      due_date: { type: 'string', example: '2024-01-31T00:00:00Z' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getDashboardOverview() {
    // TODO: Implement dashboard overview logic
    const mockOverview = {
      current_balance: 4836.00,
      income: 3814.25,
      expenses: 1700.50,
      pots: {
        total_saved: 850.00,
        pots: [
          {
            id: '1',
            name: 'Savings',
            total_saved: 159.00,
            theme_color: '#277C78',
          },
          {
            id: '2',
            name: 'Concert Ticket',
            total_saved: 110.00,
            theme_color: '#F2CDAC',
          },
          {
            id: '3',
            name: 'Gift',
            total_saved: 40.00,
            theme_color: '#82C9D7',
          },
          {
            id: '4',
            name: 'New Laptop',
            total_saved: 10.00,
            theme_color: '#626070',
          },
        ],
      },
      budgets: {
        budgets: [
          {
            id: '1',
            category: 'Entertainment',
            maximum_amount: 50.00,
            theme_color: '#277C78',
            spent: 25.00,
          },
          {
            id: '2',
            category: 'Bills',
            maximum_amount: 750.00,
            theme_color: '#82C9D7',
            spent: 250.00,
          },
          {
            id: '3',
            category: 'Dining Out',
            maximum_amount: 75.00,
            theme_color: '#F2CDAC',
            spent: 67.50,
          },
          {
            id: '4',
            category: 'Personal Care',
            maximum_amount: 100.00,
            theme_color: '#626070',
            spent: 65.00,
          },
        ],
      },
      transactions: {
        recent_transactions: [
          {
            id: '1',
            name: 'Emma Richardson',
            category: 'General',
            transaction_date: '2024-08-19T14:23:11Z',
            amount: 75.50,
          },
          {
            id: '2',
            name: 'Savory Bites Bistro',
            category: 'Dining Out',
            transaction_date: '2024-08-19T20:23:11Z',
            amount: -55.50,
          },
          {
            id: '3',
            name: 'Daniel Carter',
            category: 'General',
            transaction_date: '2024-08-18T09:45:32Z',
            amount: -42.30,
          },
          {
            id: '4',
            name: 'Sun Park',
            category: 'General',
            transaction_date: '2024-08-17T14:37:21Z',
            amount: 120.00,
          },
          {
            id: '5',
            name: 'Urban Services Hub',
            category: 'General',
            transaction_date: '2024-08-17T16:52:04Z',
            amount: -65.00,
          },
        ],
      },
      recurring_bills: {
        total_bills: 384.00,
        paid_bills: 190.00,
        upcoming_bills: 194.00,
        due_soon: [
          {
            id: '1',
            name: 'Paid Bills',
            amount: -190.00,
            due_date: '2024-08-30T00:00:00Z',
          },
          {
            id: '2',
            name: 'Total Upcoming',
            amount: -194.00,
            due_date: '2024-08-31T00:00:00Z',
          },
          {
            id: '3',
            name: 'Due Soon',
            amount: -59.00,
            due_date: '2024-08-31T00:00:00Z',
          },
        ],
      },
    };

    return {
      success: true,
      data: mockOverview,
    };
  }
}