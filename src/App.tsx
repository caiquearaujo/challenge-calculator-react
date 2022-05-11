import React from 'react';
import CalculatorKey from '@/components/CalculatorKey';

export default function App() {
	return (
		<React.Fragment>
			<div className="wrapper-keypad">
				<div className="calculator-keypad">
					<CalculatorKey calcKey="clear-all" onPress={() => true} />
					<CalculatorKey calcKey="clear" onPress={() => true} />
					<CalculatorKey calcKey="empty" onPress={() => true} />
					<CalculatorKey calcKey="divide" onPress={() => true} />
					<CalculatorKey calcKey="7" onPress={() => true} />
					<CalculatorKey calcKey="8" onPress={() => true} />
					<CalculatorKey calcKey="9" onPress={() => true} />
					<CalculatorKey calcKey="times" onPress={() => true} />
					<CalculatorKey calcKey="4" onPress={() => true} />
					<CalculatorKey calcKey="5" onPress={() => true} />
					<CalculatorKey calcKey="6" onPress={() => true} />
					<CalculatorKey calcKey="minus" onPress={() => true} />
					<CalculatorKey calcKey="1" onPress={() => true} />
					<CalculatorKey calcKey="2" onPress={() => true} />
					<CalculatorKey calcKey="3" onPress={() => true} />
					<CalculatorKey calcKey="plus" onPress={() => true} />
					<CalculatorKey calcKey="empty" onPress={() => true} />
					<CalculatorKey calcKey="0" onPress={() => true} />
					<CalculatorKey calcKey="empty" onPress={() => true} />
					<CalculatorKey calcKey="equals" onPress={() => true} />
				</div>
			</div>
		</React.Fragment>
	);
}
