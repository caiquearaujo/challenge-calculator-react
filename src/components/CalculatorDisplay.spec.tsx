import React from 'react';
import { render, screen } from '@testing-library/react';
import CalculatorDisplay from './CalculatorDisplay';

describe('Calculator Display', () => {
	it('should display value', () => {
		render(<CalculatorDisplay value="125" />);
		expect(screen.getByText('125')).toBeInTheDocument();
	});
});
