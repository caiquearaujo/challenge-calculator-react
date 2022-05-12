import Calculator, { TCalculatorState, TOperator } from './calculator';

let state = {
	value: null,
	display: '0',
	operator: null,
	waiting: false,
	history: [],
} as TCalculatorState;

const setState: any = (s: any) => (state = s);

const calculator = new Calculator(state, setState);

const doExpression = (exp: Array<string>, calculator: Calculator) => {
	exp.forEach(e => {
		const match = e.match(/([doepf!])(?:[:](.*))?/i) as RegExpMatchArray;

		if (match[1] === 'd') {
			for (const c of match[2]) {
				calculator.digit(c);
			}

			return;
		}

		if (match[1] === 'p') {
			calculator.percent();
			return;
		}

		if (match[1] === 'f') {
			calculator.point();
			return;
		}

		if (match[1] === '!') {
			calculator.changeSign();
			return;
		}

		calculator.operation(match[2] as TOperator);
	});
};

afterEach(() => {
	calculator.clearAll();
});

describe('Calculator', () => {
	const display = [
		{ exp: ['d:12'], asn: '12', m: 'add digits' },
		{
			exp: ['d:12', '!'],
			asn: '-12',
			m: 'change sign to negative',
		},
		{
			exp: ['d:12', '!', '!'],
			asn: '12',
			m: 'change sign back to positive',
		},
		{ exp: ['d:00012'], asn: '12', m: 'ignore zeros on left' },
		{ exp: ['d:12000'], asn: '12000', m: 'accept zeros on right' },
		{ exp: ['d:99999999'], asn: '99999999', m: 'accept 8 digits' },
		{
			exp: ['d:9999999999'],
			asn: '99999999',
			m: 'ignore more than 8 digits',
		},
		{
			exp: ['d:12', 'f', 'd:5'],
			asn: '12.5',
			m: 'accept decimal places',
		},
		{
			exp: ['d:12', 'f', 'd:578'],
			asn: '12.578',
			m: 'accept 3 decimal places',
		},
		{
			exp: ['d:12', 'f', 'd:5785'],
			asn: '12.578',
			m: 'ignore more than 3 decimal places',
		},
		{
			exp: ['f', 'd:47'],
			asn: '0.47',
			m: 'accept zero with decimal places',
		},
		{
			exp: ['d:10', 'o:+', 'd:10', 'o:='],
			asn: '20',
			m: 'sum values',
		},
		{
			exp: ['d:10', 'o:+', 'd:10', 'o:+'],
			asn: '20',
			m: 'sum values without equals operator',
		},
		{
			exp: ['o:+', 'd:10', 'o:='],
			asn: '10',
			m: 'sum values without start value',
		},
		{
			exp: ['d:10', 'o:-', 'd:20', 'o:='],
			asn: '-10',
			m: 'subtract values',
		},
		{
			exp: ['d:10', 'o:-', 'd:10', 'o:-'],
			asn: '0',
			m: 'subtract values without equals operator',
		},
		// TODO
		// {
		// 	exp: ['o:-', 'd:10', 'o:='],
		// 	asn: '-10',
		// 	m: 'subtract values without start value',
		// },
		{
			exp: ['d:10', 'o:*', 'd:10', 'o:='],
			asn: '100',
			m: 'multiply values',
		},
		{
			exp: ['d:10', 'o:*', 'd:10', 'o:+'],
			asn: '100',
			m: 'multiply values without equals operator',
		},
		{
			exp: ['o:*', 'd:10', 'o:='],
			asn: '10',
			m: 'multiply values without start value',
		},
		{
			exp: ['d:10', 'o:/', 'd:10', 'o:='],
			asn: '1',
			m: 'dvide values',
		},
		{
			exp: ['d:100', 'o:/', 'd:10', 'o:/'],
			asn: '10',
			m: 'divide values without equals operator',
		},
		{
			exp: ['o:/', 'd:10', 'o:='],
			asn: '10',
			m: 'divide values without start value',
		},
	];

	it.each(display)('should $m on $exp as $asn', ({ exp, asn }) => {
		doExpression(exp, calculator);
		expect(state).toStrictEqual({ ...state, display: asn });
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

	it('should do complex operation and store on value', () => {
		doExpression(
			[
				'd:12',
				'o:+',
				'd:18',
				'o:-',
				'd:6',
				'o:*',
				'd:16',
				'o:/',
				'd:2',
				'o:=',
			],
			calculator
		);

		expect(state).toStrictEqual({
			...state,
			display: '192',
			value: 192,
			operator: '=',
			waiting: true,
		});
	});

	it('should continue calculation after equal and store on value', () => {
		doExpression(
			['d:10', 'o:+', 'd:10', 'o:=', 'o:+', 'd:6', 'o:+', 'd:2', 'o:='],
			calculator
		);

		expect(state).toStrictEqual({
			...state,
			display: '28',
			value: 28,
			operator: '=',
			waiting: true,
		});
	});

	it('should restart calculation after equal and store on value', () => {
		doExpression(
			['d:10', 'o:+', 'd:10', 'o:=', 'd:6', 'o:+', 'd:2', 'o:='],
			calculator
		);

		expect(state).toStrictEqual({
			...state,
			display: '8',
			value: 8,
			operator: '=',
			waiting: true,
		});
	});

	it('should return error when digits are greater than 8', () => {
		doExpression(['d:10000000', 'o:+', 'd:90000000', 'o:='], calculator);

		expect(state).toStrictEqual({
			...state,
			display: 'ERR',
			value: 0,
			operator: '=',
			waiting: true,
		});
	});

	it('should solve percent expression', () => {
		const exp = ['d:120', 'o:*', 'd:30', 'p', 'o:='];
		doExpression(exp, calculator);
		expect(state.display).toBe('36.00');
	});
});
