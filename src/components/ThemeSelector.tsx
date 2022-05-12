import React from 'react';

import './ThemeSelector.scss';

export type TThemeSelectorProps = {
	selected: 'light' | 'dark';
	changeTo: (to: 'light' | 'dark') => void;
};

export default function ThemeSelector(props: TThemeSelectorProps) {
	const { selected, changeTo } = props;
	return (
		<div className="theme-selector">
			<div
				className={`button ${selected === 'light' ? 'selected' : ''}`}
				onClick={() => changeTo('light')}>
				<svg
					className="sun"
					viewBox="0 0 256 256"
					xmlns="http://www.w3.org/2000/svg">
					<circle
						className="stroke"
						cx="128"
						cy="128"
						fill="none"
						r="60"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="128"
						x2="128"
						y1="36"
						y2="16"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="62.9"
						x2="48.8"
						y1="62.9"
						y2="48.8"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="36"
						x2="16"
						y1="128"
						y2="128"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="62.9"
						x2="48.8"
						y1="193.1"
						y2="207.2"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="128"
						x2="128"
						y1="220"
						y2="240"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="193.1"
						x2="207.2"
						y1="193.1"
						y2="207.2"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="220"
						x2="240"
						y1="128"
						y2="128"
					/>
					<line
						className="stroke"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						x1="193.1"
						x2="207.2"
						y1="62.9"
						y2="48.8"
					/>
				</svg>
			</div>
			<div
				className={`button ${selected === 'dark' ? 'selected' : ''}`}
				onClick={() => changeTo('dark')}>
				<svg className="moon" viewBox="0 0 91 91">
					<path d="M7.04,35.045C4.237,46.792,6.176,58.927,12.5,69.216c8.292,13.488,22.706,21.543,38.559,21.543      c8.332,0,16.504-2.318,23.635-6.703c4.172-2.564,7.883-5.779,11.031-9.551c0.703-0.842,0.777-2.043,0.184-2.967      c-0.592-0.924-1.713-1.354-2.775-1.066c-2.932,0.801-5.961,1.205-9.008,1.205c-12.049,0-23.002-6.117-29.299-16.367      c-4.809-7.818-6.283-17.043-4.152-25.975c2.131-8.93,7.611-16.494,15.434-21.301c1.256-0.771,2.613-1.484,4.033-2.119      c1.002-0.447,1.598-1.492,1.473-2.58c-0.125-1.09-0.943-1.973-2.02-2.182c-2.838-0.549-5.74-0.826-8.625-0.826      c-8.33,0-16.501,2.316-23.631,6.697C17.051,13.349,9.842,23.3,7.04,35.045z M29.971,11.306      c6.337-3.895,13.599-5.955,20.999-5.955c0.035,0,0.068,0.002,0.104,0.002C43.39,10.87,38.005,18.874,35.787,28.169      c-2.443,10.236-0.752,20.811,4.759,29.773c7.219,11.746,19.771,18.76,33.58,18.76c0.783,0,1.568-0.023,2.35-0.07      c-1.396,1.145-2.869,2.193-4.414,3.143c-6.338,3.898-13.6,5.959-21.002,5.959c-14.094,0-26.908-7.158-34.278-19.148      c-5.622-9.145-7.345-19.932-4.854-30.372C14.418,25.772,20.826,16.927,29.971,11.306z" />
				</svg>
			</div>
		</div>
	);
}
