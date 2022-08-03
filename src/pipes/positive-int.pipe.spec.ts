import { PositiveIntPipe } from './positive-int.pipe';

describe('PositiveIntPipe', () => {
  it('should be defined', () => {
    expect(new PositiveIntPipe()).toBeDefined();
  });
  it('should be 523', () => {
    expect(new PositiveIntPipe().transform(-523)).toBe(523);
  });
  it('should be 0', () => {
    expect(new PositiveIntPipe().transform(-0)).toBe(0);
  });
});
