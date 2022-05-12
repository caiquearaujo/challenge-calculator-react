import React from 'react';
import { render } from '@testing-library/react';
import CalculatorHistory from './CalculatorHistory';

describe('Theme Selector', () => {
	it('should render component', () => {
		const { container } = render(<CalculatorHistory history={[]} />);
		expect(container.querySelectorAll('span').length).toBe(0);
	});

	it('should add history elements', () => {
		const { container } = render(
			<CalculatorHistory history={['12', '+', '12', '=']} />
		);

		expect(container.querySelectorAll('span').length).toBe(4);
	});

	it('should ignore empty history elements', () => {
		const { container } = render(
			<CalculatorHistory history={['12', '+', '12', '', '=', '']} />
		);

		expect(container.querySelectorAll('span').length).toBe(4);
		expect(container.textContent).toBe('12+12=');
	});

	it('should have first element as operator', () => {
		const { container } = render(<CalculatorHistory history={['=']} />);

		expect(container.querySelector('span')).not.toBeNull();
		expect(container.querySelector('span')?.textContent).toBe('=');
		expect(container.querySelector('span')?.className).toBe('operator');
	});

	it('should have first element as number', () => {
		const { container } = render(<CalculatorHistory history={['12']} />);

		expect(container.querySelector('span')).not.toBeNull();
		expect(container.querySelector('span')?.textContent).toBe('12');
	});

	it('should format number', () => {
		const { container } = render(
			<CalculatorHistory history={['12258.126']} />
		);

		expect(container.querySelector('span')?.textContent).toBe(
			'12,258.126'
		);
	});
});
