import React from 'react';
import Calculator from '@/core/calculator';
import CalculatorKey, { TCalculatorKey } from './CalculatorKey';

import './CalculatorKeyPad.scss';

export type TCalculatorKeyPadProps = {
	calculator: Calculator;
};

const keys = [
	{ key: 'clear-all', cb: (calc: Calculator) => calc.clearAll() },
	{ key: 'clear', cb: (calc: Calculator) => calc.clearDisplay() },
	{ key: 'empty' },
	{ key: 'divide', cb: (calc: Calculator) => calc.operation('/') },
	{ key: '7', cb: (calc: Calculator) => calc.digit('7') },
	{ key: '8', cb: (calc: Calculator) => calc.digit('8') },
	{ key: '9', cb: (calc: Calculator) => calc.digit('9') },
	{ key: 'times', cb: (calc: Calculator) => calc.operation('*') },
	{ key: '4', cb: (calc: Calculator) => calc.digit('4') },
	{ key: '5', cb: (calc: Calculator) => calc.digit('5') },
	{ key: '6', cb: (calc: Calculator) => calc.digit('6') },
	{ key: 'minus', cb: (calc: Calculator) => calc.operation('-') },
	{ key: '1', cb: (calc: Calculator) => calc.digit('1') },
	{ key: '2', cb: (calc: Calculator) => calc.digit('2') },
	{ key: '3', cb: (calc: Calculator) => calc.digit('3') },
	{ key: 'plus', cb: (calc: Calculator) => calc.operation('+') },
	{ key: 'empty' },
	{ key: '0', cb: (calc: Calculator) => calc.digit('0') },
	{ key: 'empty' },
	{ key: 'equals', cb: (calc: Calculator) => calc.operation('=') },
] as Array<{ key: TCalculatorKey; cb?: (calc: Calculator) => void }>;

export default function CalculatorKeyPad(props: TCalculatorKeyPadProps) {
	const { calculator } = props;

	return (
		<div className="calculator-keypad">
			<div className="keypad">
				{keys.map((props, i) => (
					<CalculatorKey
						calcKey={props.key}
						onPress={() => {
							if (props.cb) props.cb(calculator);
						}}
						key={`calc-key-${i}`}
					/>
				))}
			</div>
		</div>
	);
}
