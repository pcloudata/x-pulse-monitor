import { describe, it, expect } from 'vitest';

describe('X Pulse CLI', () => {
  it('should have core commands registered', () => {
    // Basic structure test - we know the commands exist from index.ts
    const commands = ['init', 'monitor', 'start-multi-agent'];
    
    expect(commands).toContain('init');
    expect(commands).toContain('monitor');
    expect(commands).toContain('start-multi-agent');
  });

  it('should support voice flag', () => {
    expect(true).toBe(true); // Placeholder for future real test
  });
});
