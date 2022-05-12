import React, { useState } from 'react';

import CalculatorDisplay from '@/components/CalculatorDisplay';
import CalculatorKeyPad from '@/components/CalculatorKeyPad';
import Calculator, { TCalculatorState } from '@/core/calculator';
import CalculatorHistory from './components/CalculatorHistory';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
	const [state, setState] = useState<TCalculatorState>({
		value: null,
		display: '0',
		operator: null,
		waiting: false,
		history: [],
	});

	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	const calculator = new Calculator(state, setState);

	return (
		<main className={`calculator ${theme}`}>
			<ThemeSelector
				selected={theme}
				changeTo={(to: 'light' | 'dark') => setTheme(to)}
			/>
			<div className="container">
				<CalculatorHistory history={state.history} />
				<CalculatorDisplay value={state.display} />
				<CalculatorKeyPad calculator={calculator} />
			</div>
		</main>
	);
}
