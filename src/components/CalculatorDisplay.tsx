import React from 'react';
import { parseNumber } from '@/core/parser';

import './CalculatorDisplay.scss';

export type TCalculatorDisplayProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	value: string;
};

export default function CalculatorDisplay(props: TCalculatorDisplayProps) {
	const { value, ...rest } = props;
	return (
		<div {...rest} className="calculator-display">
			{parseNumber(value)}
		</div>
	);
}
