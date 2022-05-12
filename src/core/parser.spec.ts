import { parseNumber } from './parser';

describe('Parser', () => {
	const number = [
		{ number: '10', formatted: '10', lang: 'en-US' },
		{ number: '1000', formatted: '1,000', lang: 'en-US' },
		{ number: '15245.598', formatted: '15,245.598', lang: 'en-US' },
		{ number: '18.24395', formatted: '18.244', lang: 'en-US' },
		{ number: 'e.10', formatted: 'ERR', lang: 'en-US' },
		{ number: '10', formatted: '10', lang: 'pt-BR' },
		{ number: '1000', formatted: '1.000', lang: 'pt-BR' },
		{ number: '15245.598', formatted: '15.245,598', lang: 'pt-BR' },
		{ number: '18.24395', formatted: '18,244', lang: 'pt-BR' },
		{ number: 'e.10', formatted: 'ERR', lang: 'pt-BR' },
	];

	it.each(number)(
		'should parse $number as $formatted',
		({ number, formatted, lang }) => {
			expect(parseNumber(number, lang)).toBe(formatted);
		}
	);
});
