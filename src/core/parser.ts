export function parseNumber(
	value: string,
	lang: string | null = null
): string {
	const num = parseFloat(value);
	const _lang = lang || navigator.language || 'en-US';

	return isNaN(num)
		? 'ERR'
		: num.toLocaleString(_lang, {
				useGrouping: true,
				maximumFractionDigits: 3,
		  });
}
