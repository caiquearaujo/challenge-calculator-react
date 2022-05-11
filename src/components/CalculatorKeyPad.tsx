import React from 'react';
import CalculatorKey, { TCalculatorKeyProps } from './CalculatorKey';

import './CalculatorKeyPad.scss';

const keys: Array<TCalculatorKeyProps> = [
	{ calcKey: 'clear-all', onPress: () => true },
	{ calcKey: 'clear', onPress: () => true },
	{ calcKey: 'empty', onPress: () => true },
	{ calcKey: 'divide', onPress: () => true },
	{ calcKey: '7', onPress: () => true },
	{ calcKey: '8', onPress: () => true },
	{ calcKey: '9', onPress: () => true },
	{ calcKey: 'times', onPress: () => true },
	{ calcKey: '4', onPress: () => true },
	{ calcKey: '5', onPress: () => true },
	{ calcKey: '6', onPress: () => true },
	{ calcKey: 'minus', onPress: () => true },
	{ calcKey: '1', onPress: () => true },
	{ calcKey: '2', onPress: () => true },
	{ calcKey: '3', onPress: () => true },
	{ calcKey: 'plus', onPress: () => true },
	{ calcKey: 'empty', onPress: () => true },
	{ calcKey: '0', onPress: () => true },
	{ calcKey: 'empty', onPress: () => true },
	{ calcKey: 'equals', onPress: () => true },
];

export default function CalculatorKeyPad() {
	return (
		<div className="calculator-keypad">
			<div className="keypad">
				{keys.map((props, i) => (
					<CalculatorKey {...props} key={`calc-key-${i}`} />
				))}
			</div>
		</div>
	);
}
