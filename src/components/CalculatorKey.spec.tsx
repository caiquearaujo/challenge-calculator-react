import { fireEvent, render, screen } from '@testing-library/react';
import CalculatorKey, { TCalculatorKey } from './CalculatorKey';

describe('Calculator Key', () => {
	const keys: Array<TCalculatorKey> = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'plus',
		'minus',
		'times',
		'divide',
		'equals',
		'clear',
		'clear-all',
		'empty',
	];

	it.each(keys)('should render calculator key %s.', async key => {
		render(<CalculatorKey calcKey={key} onPress={e => true} />);
		expect(screen.getByRole('button')).toHaveClass(
			`calculator-key key-${key}`
		);
	});

	it('should fire "onPress" prop on button click', () => {
		const onPress = jest.fn();
		render(<CalculatorKey calcKey="0" onPress={onPress} />);

		fireEvent.click(screen.getByRole('button'));
		expect(onPress).toHaveBeenCalled();
	});
});
