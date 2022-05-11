export function parseNumber(value: string): string {
	return parseFloat(value).toLocaleString(navigator.language || 'en-US', {
		useGrouping: true,
		maximumFractionDigits: 3,
	});
}
