export class UserBalance {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly currentBalance: number,
    public readonly totalIncome: number,
    public readonly totalExpenses: number,
    public readonly updatedAt: Date,
  ) {}

  get netWorth(): number {
    return this.totalIncome - this.totalExpenses;
  }

  get savingsRate(): number {
    if (this.totalIncome === 0) return 0;
    return ((this.totalIncome - this.totalExpenses) / this.totalIncome) * 100;
  }
}