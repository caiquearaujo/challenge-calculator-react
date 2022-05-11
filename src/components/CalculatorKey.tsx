import React from 'react';
import './CalculatorKey.scss';

export type TCalculatorKey =
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| 'plus'
	| 'minus'
	| 'times'
	| 'divide'
	| 'equals'
	| 'clear'
	| 'clear-all'
	| 'empty';

export type TCalculatorKeyProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	calcKey: TCalculatorKey;
	onPress: (e: React.MouseEvent) => void;
};

export default function CalculatorKey(props: TCalculatorKeyProps) {
	const { calcKey, onPress, ...rest } = props;
	return (
		<button
			{...rest}
			onClick={onPress}
			className={`calculator-key key-${calcKey}`}
		/>
	);
}
