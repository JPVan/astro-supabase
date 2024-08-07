import { describe, it, expect } from 'vitest';
import { costOfQuantity } from './Utility';

describe('costOfQuantity', () => {
    it('should calculate the correct total cost for quantity 3, currentPrice 1, and multiplier 2', () => {
        const quantity = 3;
        const currentPrice = 1;
        const multiplier = 2;

        const result = costOfQuantity(quantity, currentPrice, multiplier);

        // Expected cost calculation:
        // 1 + (1 * 2) + (1 * 2 * 2) = 1 + 2 + 4 = 7
        const expected = 7;

        expect(result).toBe(expected);
    });

    it('should calculate the correct total cost for quantity 10, currentPrice 100, and multiplier 1.1', () => {
        const quantity = 10;
        const currentPrice = 100;
        const multiplier = 1.1;

        const result = costOfQuantity(quantity, currentPrice, multiplier);

        // Expected cost calculation:
        // 100 + (100 * 1.1) + (100 * 1.1^2) + ... + (100 * 1.1^9)
        const expected = currentPrice * (1 - Math.pow(multiplier, quantity)) / (1 - multiplier);

        expect(result).toBeCloseTo(expected, 5); // Allowing a small tolerance for floating-point arithmetic
    });
});