export function parseNumber(value: string): string {
	const num = parseFloat(value);

	return isNaN(num)
		? 'ERR'
		: num.toLocaleString(navigator.language || 'en-US', {
				useGrouping: true,
				maximumFractionDigits: 3,
		  });
}
