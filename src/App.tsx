import React, { useEffect, useState } from 'react';

import CalculatorDisplay from '@/components/CalculatorDisplay';
import CalculatorKeyPad from '@/components/CalculatorKeyPad';
import Calculator, { TCalculatorState, TOperator } from '@/core/calculator';
import CalculatorHistory from './components/CalculatorHistory';
import ThemeSelector, { TThemeColor } from './components/ThemeSelector';

export default function App() {
	const [state, setState] = useState<TCalculatorState>({
		value: null,
		display: '0',
		operator: null,
		waiting: false,
		history: [],
	});

	const [theme, setTheme] = useState<TThemeColor>('light');

	const calculator = new Calculator(state, setState);

	const handlerKeys = (e: KeyboardEvent) => {
		const { key } = e;

		const allowedKeys = [
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
			'+',
			'-',
			'*',
			'/',
			'%',
			'.',
			',',
			'Escape',
			'Backspace',
			'Enter',
			'Delete',
		];

		if (!allowedKeys.includes(key)) return;

		e.preventDefault();

		if (/\d/.test(key)) {
			calculator.digit(key);
			return;
		}

		if (['+', '-', '*', '/', '='].includes(key)) {
			calculator.operation(key as TOperator);
			return;
		}

		switch (key) {
			case '.':
			case ',':
				calculator.point();
				return;
			case '%':
				calculator.percent();
				return;
			case 'Backspace':
				calculator.clearLast();
				return;
			case 'Enter':
				calculator.operation('=');
				return;
			case 'Escape':
				calculator.clearAll();
				return;
			case 'Delete':
			case 'Clear':
				state.display !== '0'
					? calculator.clearDisplay()
					: calculator.clearAll();
				return;
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handlerKeys);
	}, []);

	return (
		<main className={`calculator ${theme}`}>
			<ThemeSelector
				selected={theme}
				changeTo={(to: TThemeColor) => setTheme(to)}
			/>
			<div className="container">
				<CalculatorHistory history={state.history} />
				<CalculatorDisplay value={state.display} />
				<CalculatorKeyPad calculator={calculator} />
			</div>
		</main>
	);
}
