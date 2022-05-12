import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeSelector, { TThemeColor } from './ThemeSelector';
import userEvent from '@testing-library/user-event';

let theme: TThemeColor = 'light';
const setTheme = (t: any) => (theme = t);

describe('Theme Selector', () => {
	it('should render component', () => {
		render(<ThemeSelector selected={theme} changeTo={setTheme} />);

		expect(screen.getByTestId('light-button')).toBeInTheDocument();
		expect(screen.getByTestId('dark-button')).toBeInTheDocument();
	});

	it('should change theme to light', () => {
		render(<ThemeSelector selected={theme} changeTo={setTheme} />);

		userEvent.click(screen.getByTestId('light-button'));
		expect(theme).toBe('light');
	});

	it('should change theme to dark', () => {
		render(<ThemeSelector selected={theme} changeTo={setTheme} />);

		userEvent.click(screen.getByTestId('dark-button'));
		expect(theme).toBe('dark');
	});

	it('should be selected as light', () => {
		theme = 'light';

		render(<ThemeSelector selected={theme} changeTo={setTheme} />);
		expect(screen.getByTestId('light-button')).toHaveClass('selected');
	});

	it('should be selected as dark', () => {
		theme = 'dark';

		render(<ThemeSelector selected={theme} changeTo={setTheme} />);
		expect(screen.getByTestId('dark-button')).toHaveClass('selected');
	});
});
