import React from 'react';
import { render, screen } from '@testing-library/react';
import Calculator, { TCalculatorState } from '@/core/calculator';
import CalculatorKeyPad from './CalculatorKeyPad';

let state = {
	value: null,
	display: '0',
	operator: null,
	waiting: false,
} as TCalculatorState;

const setState: any = (s: any) => (state = s);

const calculator = new Calculator(state, setState);

describe('Calculator Key Pad', () => {
	it('should have all keys', () => {
		render(<CalculatorKeyPad calculator={calculator} />);
		expect(screen.getAllByRole('button').length).toBe(20);
	});
});
