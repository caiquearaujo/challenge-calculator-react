import React from 'react';

export type TOperator = '/' | '*' | '+' | '-' | '=' | null;

export type TCalculatorState = {
	value: number | null;
	display: string;
	operator: TOperator;
	waiting: boolean;
	history: Array<string>;
};

export default class Calculator {
	private _state: TCalculatorState;
	private _apply: React.Dispatch<React.SetStateAction<TCalculatorState>>;

	private _operations = {
		'/': (p: number, n: number): number => p / n,
		'*': (p: number, n: number): number => p * n,
		'+': (p: number, n: number): number => p + n,
		'-': (p: number, n: number): number => p - n,
		'=': (p: number, n: number): number => n,
	};

	constructor(
		state: TCalculatorState,
		apply: React.Dispatch<React.SetStateAction<TCalculatorState>>
	) {
		this._state = state;
		this._apply = apply;
	}

	public clearAll(): void {
		this.apply({
			value: null,
			display: '0',
			operator: null,
			waiting: false,
			history: [],
		});
	}

	public clearLast(): void {
		const { display } = this._state;

		this.apply({
			display: display.substring(0, display.length - 1) || '0',
		});
	}

	public clearDisplay(): void {
		this.apply({
			display: '0',
		});
	}

	public digit(d: string): void {
		const { display, waiting, operator, history } = this._state;

		if (waiting) {
			let _history = history;

			if (operator === '=') _history = [];

			return this.apply({
				display: d,
				waiting: false,
				history: _history,
			});
		}

		const { integer, decimal, isFloat } = this.numDetails(display);

		if ((integer >= 8 && !isFloat) || (decimal >= 3 && isFloat)) {
			return;
		}

		return this.apply({
			display: display === '0' ? d : display + d,
		});
	}

	public changeSign() {
		const { display } = this._state;
		this.apply({ display: (parseFloat(display) * -1).toString() });
	}

	public operation(o: TOperator): void {
		const { value, display, operator, waiting, history } = this._state;
		const currValue = parseFloat(display || '0');

		if (waiting) {
			if (operator !== o && o) {
				history.pop();
				if (o) history.push(o);

				this.apply({ operator: o, history });
			}
			return;
		}

		if (!value) {
			this.apply({ value: currValue });
		} else if (operator) {
			let newValue = this._operations[operator](value || 0, currValue);
			let strValue = newValue.toString();

			const { integer } = this.numDetails(display);

			if (integer >= 8) {
				newValue = 0;
				strValue = 'ERR';
			}

			this.apply({ value: newValue, display: strValue });
		}

		history.push(display);
		if (o) history.push(o);
		this.apply({ waiting: true, operator: o, history });
	}

	public percent() {
		const { value, display, history } = this._state;
		let currValue = parseFloat(display);

		if (currValue === 0) return;

		const { decimal } = this.numDetails(display);

		history.push(display);
		history.push('%');
		// empty space to keep percert after operations
		history.push('');

		if (value) {
			const newValue = this._operations['*'](
				value || 0,
				(currValue /= 100)
			);

			return this.apply({
				waiting: true,
				value: newValue,
				display: newValue.toFixed(decimal + 2),
				history,
			});
		}

		return this.apply({
			waiting: true,
			display: (currValue / 100).toFixed(decimal + 2),
			history,
		});
	}

	public point() {
		const { display } = this._state;

		if (!/\./.test(display)) {
			this.apply({ display: display + '.', waiting: false });
		}
	}

	public numDetails(value: string) {
		const number = value.split('.');

		return {
			integer: (number[0] || '').length,
			decimal: (number[1] || '').length,
			isFloat: value.indexOf('.') !== -1,
		};
	}

	protected apply(state: Partial<TCalculatorState>): void {
		this._state = { ...this._state, ...state };
		return this._apply(this._state);
	}
}
