import React, { useState } from 'react';

import CalculatorDisplay from '@/components/CalculatorDisplay';
import CalculatorKeyPad from '@/components/CalculatorKeyPad';
import Calculator, { TCalculatorState } from '@/core/calculator';
import CalculatorHistory from './components/CalculatorHistory';

export default function App() {
	const [state, setState] = useState<TCalculatorState>({
		value: null,
		display: '0',
		operator: null,
		waiting: false,
		history: [],
	});

	const calculator = new Calculator(state, setState);

	return (
		<main className="calculator">
			<div className="container">
				<CalculatorHistory history={state.history} />
				<CalculatorDisplay value={state.display} />
				<CalculatorKeyPad calculator={calculator} />
			</div>
		</main>
	);
}
