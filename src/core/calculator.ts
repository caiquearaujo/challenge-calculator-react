import React from 'react';

export type TOperator = '/' | '*' | '+' | '-' | '=' | null;

export type TCalculatorState = {
	value: number | null;
	display: string;
	operator: TOperator;
	waiting: boolean;
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
		});
	}

	public clearLast(): void {
		const { display } = this._state;

		this.apply({
			display: display.substring(0, display.length - 1) || '0',
		});
	}

	public clearDisplay(): void {
		this.apply({ display: '0' });
	}

	public digit(d: string): void {
		const { display, waiting } = this._state;

		if (waiting) {
			return this.apply({ display: d, waiting: false });
		}
		if (display.length >= 8) {
			return;
		}

		return this.apply({
			display: display === '0' ? d : display + d,
		});
	}

	public operation(o: TOperator): void {
		const { value, display, operator, waiting } = this._state;
		const currValue = parseFloat(display);

		if (waiting) {
			if (operator !== o) this.apply({ operator: o });
			return;
		}

		if (!value) {
			this.apply({ value: currValue });
		} else if (operator) {
			let newValue = this._operations[operator](value || 0, currValue);
			let strValue = newValue.toString();

			if (strValue.length > 8) {
				newValue = 0;
				strValue = 'ERR';
			}

			this.apply({ value: newValue, display: strValue });
		}

		this.apply({ waiting: true, operator: o });
	}

	protected apply(state: Partial<TCalculatorState>): void {
		this._state = { ...this._state, ...state };
		return this._apply(this._state);
	}
}