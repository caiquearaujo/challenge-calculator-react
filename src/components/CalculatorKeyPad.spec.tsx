import { render, screen } from '@testing-library/react';
import CalculatorKeyPad from './CalculatorKeyPad';

describe('Calculator Key Pad', () => {
	it('should have all keys', () => {
		render(<CalculatorKeyPad />);
		expect(screen.getAllByRole('button').length).toBe(20);
	});
});
