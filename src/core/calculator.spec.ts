import Calculator, { TCalculatorState } from './calculator';

let state = {
	value: null,
	display: '0',
	operator: null,
	waiting: false,
	history: [],
} as TCalculatorState;

const setState: any = (s: any) => (state = s);

const calculator = new Calculator(state, setState);

afterEach(() => {
	calculator.clearAll();
});

describe('Calculator', () => {
	it('should add digits to state display', () => {
		calculator.digit('1');
		calculator.digit('2');

		expect(state).toStrictEqual({ ...state, display: '12' });
	});

	it('should change digits sign to negative', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.changeSign();

		expect(state).toStrictEqual({ ...state, display: '-12' });
	});

	it('should change digits sign to positive', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.changeSign();
		calculator.changeSign();

		expect(state).toStrictEqual({ ...state, display: '12' });
	});

	it('should ignore zeros on left', () => {
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('1');
		calculator.digit('2');

		expect(state).toStrictEqual({ ...state, display: '12' });
	});

	it('should stop to adding digits after 8 digits added', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.digit('3');
		calculator.digit('4');
		calculator.digit('5');
		calculator.digit('6');
		calculator.digit('7');
		calculator.digit('8');
		calculator.digit('9');
		calculator.digit('9');

		expect(state).toStrictEqual({ ...state, display: '12345678' });
	});

	it('should add digits with decimal places to state display', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.point();
		calculator.digit('5');

		expect(state).toStrictEqual({ ...state, display: '12.5' });
	});

	it('should not add more than 3 decimal places to state display', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.point();
		calculator.digit('5');
		calculator.digit('6');
		calculator.digit('7');
		calculator.digit('8');

		expect(state).toStrictEqual({ ...state, display: '12.567' });
	});

	it('should clear all', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.clearAll();

		expect({
			value: null,
			display: '0',
			operator: null,
			waiting: false,
			history: [],
		}).toStrictEqual({ ...state, display: '0' });
	});

	it('should clear display', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.digit('3');
		calculator.digit('4');
		calculator.clearDisplay();

		expect(state).toStrictEqual({ ...state, display: '0' });
	});

	it('should clear last digit', () => {
		calculator.digit('1');
		calculator.digit('2');
		calculator.clearLast();

		expect(state).toStrictEqual({ ...state, display: '1' });
	});

	it('should clear last digit returning zero', () => {
		calculator.digit('1');
		calculator.clearLast();
		calculator.clearLast();

		expect(state).toStrictEqual({ ...state, display: '0' });
	});

	it('should add an operator', () => {
		calculator.digit('1');
		calculator.operation('+');

		expect(state).toStrictEqual({
			...state,
			display: '1',
			value: 1,
			operator: '+',
			waiting: true,
		});
	});

	it('should keep operator', () => {
		calculator.digit('1');
		calculator.operation('+');
		calculator.operation('+');

		expect(state).toStrictEqual({
			...state,
			display: '1',
			value: 1,
			operator: '+',
			waiting: true,
		});
	});

	it('should change operator', () => {
		calculator.digit('1');
		calculator.operation('+');
		calculator.operation('-');

		expect(state).toStrictEqual({
			...state,
			display: '1',
			value: 1,
			operator: '-',
			waiting: true,
		});
	});

	it('should sum with start 0 and store on value', () => {
		calculator.operation('+');
		calculator.digit('1');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '1',
			value: 1,
			operator: '=',
			waiting: true,
		});
	});

	it('should sum and store on value', () => {
		calculator.digit('1');
		calculator.operation('+');
		calculator.digit('1');
		calculator.operation('+');

		expect(state).toStrictEqual({
			...state,
			display: '2',
			value: 2,
			operator: '+',
			waiting: true,
		});
	});

	it('should plus and store on value', () => {
		calculator.digit('1');
		calculator.operation('+');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '3',
			value: 3,
			operator: '=',
			waiting: true,
		});
	});

	it('should minus and store on value', () => {
		calculator.digit('1');
		calculator.operation('-');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '-1',
			value: -1,
			operator: '=',
			waiting: true,
		});
	});

	it('should times and store on value', () => {
		calculator.digit('1');
		calculator.operation('*');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '2',
			value: 2,
			operator: '=',
			waiting: true,
		});
	});

	it('should div and store on value', () => {
		calculator.digit('2');
		calculator.operation('/');
		calculator.digit('1');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '2',
			value: 2,
			operator: '=',
			waiting: true,
		});
	});

	it('should do complex operation and store on value', () => {
		calculator.digit('12');
		calculator.operation('+');
		calculator.digit('18');
		calculator.operation('-');
		calculator.digit('6');
		calculator.operation('*');
		calculator.digit('16');
		calculator.operation('/');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '192',
			value: 192,
			operator: '=',
			waiting: true,
		});
	});

	it('should continue calculation after equal and store on value', () => {
		calculator.digit('10');
		calculator.operation('+');
		calculator.digit('10');
		calculator.operation('=');
		calculator.operation('+');
		calculator.digit('6');
		calculator.operation('+');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '28',
			value: 28,
			operator: '=',
			waiting: true,
		});
	});

	it('should restart calculation after equal and store on value', () => {
		calculator.digit('10');
		calculator.operation('+');
		calculator.digit('10');
		calculator.operation('=');
		calculator.digit('6');
		calculator.operation('+');
		calculator.digit('2');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: '8',
			value: 8,
			operator: '=',
			waiting: true,
		});
	});

	it('should return error when digits are greater than 8', () => {
		calculator.digit('1');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.operation('+');
		calculator.digit('9');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.digit('0');
		calculator.operation('=');

		expect(state).toStrictEqual({
			...state,
			display: 'ERR',
			value: 0,
			operator: '=',
			waiting: true,
		});
	});
});
