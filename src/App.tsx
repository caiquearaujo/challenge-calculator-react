import React from 'react';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorKeyPad from './components/CalculatorKeyPad';

export default function App() {
	return (
		<main className="calculator">
			<div className="container">
				<CalculatorDisplay value="10202030" />
				<CalculatorKeyPad />
			</div>
		</main>
	);
}
