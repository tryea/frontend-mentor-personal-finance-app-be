import configuration from './configuration';

// Declare Bun test globals
declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function expect(actual: any): {
    toBeDefined(): void;
    toBe(expected: any): void;
  };
}

describe('Configuration', () => {
  it('should return configuration object with all required properties', () => {
    const config = configuration();

    expect(config).toBeDefined();
    expect(config.port).toBeDefined();
    expect(config.database).toBeDefined();
    expect(config.redis).toBeDefined();
    expect(config.session).toBeDefined();
  });

  it('should use default port when PORT env is not set', () => {
    delete process.env.PORT;
    const config = configuration();
    
    expect(config.port).toBe(3000);
  });

  it('should use PORT env when set', () => {
    process.env.PORT = '4000';
    const config = configuration();
    
    expect(config.port).toBe(4000);
    
    // Cleanup
    delete process.env.PORT;
  });

  it('should have database configuration', () => {
    const config = configuration();
    
    expect(config.database).toBeDefined();
    expect(config.database.url).toBeDefined();
  });

  it('should have redis configuration', () => {
    const config = configuration();
    
    expect(config.redis).toBeDefined();
    expect(config.redis.host).toBeDefined();
    expect(config.redis.port).toBeDefined();
  });

  it('should have session configuration', () => {
    const config = configuration();
    
    expect(config.session).toBeDefined();
    expect(config.session.secret).toBeDefined();
    expect(typeof config.session.secret).toBe('string');
  });
});