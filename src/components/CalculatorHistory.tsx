import { parseNumber } from '@/core/parser';
import React from 'react';

import './CalculatorHistory.scss';

export type TCalculatorHistoryProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	history: Array<string>;
};

const operators = ['+', '-', '*', '/', '=', '%'];

const mapHistory = (history: Array<string>) =>
	history.map((h, i) => {
		if (!h) return;

		if (operators.includes(h)) {
			return (
				<span className="operator" key={`history-${i}`}>
					{h}
				</span>
			);
		}

		return <span key={`history-${i}`}>{parseNumber(h)}</span>;
	});

export default function CalculatorHistory(props: TCalculatorHistoryProps) {
	const { history, ...rest } = props;
	return (
		<div {...rest} className="calculator-history">
			{mapHistory(history)}
		</div>
	);
}
