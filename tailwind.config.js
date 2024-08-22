import defaultTheme from 'tailwindcss/defaultTheme'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],	theme: {
		extend: {
			fontFamily: {
				glancyrBold: ['glancyrbold', ...defaultTheme.fontFamily.sans],
				glancyrRegular: ['glancyrregular', ...defaultTheme.fontFamily.sans],
				glancyrItalic: ['glancyr_italic', ...defaultTheme.fontFamily.sans],
				glancyrThin: ['glancyrextra_light',  ...defaultTheme.fontFamily.sans],
				glancyrThinItalic: ['glancyrextra_light_italic', ...defaultTheme.fontFamily.sans],
				glancyrLight: ['glancyrlight', ...defaultTheme.fontFamily.sans],
				glancyrLightItalic: ['glancyrlight_italic', ...defaultTheme.fontFamily.sans],
				glancyrMedium: ['glancyrmedium', ...defaultTheme.fontFamily.sans],
				glancyrMediumItalic: ['glancyrmedium_italic', ...defaultTheme.fontFamily.sans],
				glancyrExtraThin : ['glancyrthin', ...defaultTheme.fontFamily.sans], 
				glancyrExtraThinItalic : ['glancyrthin_italic', ...defaultTheme.fontFamily.sans],
				baileyRegular: ['baileyregular', ...defaultTheme.fontFamily.sans], 
				stretchPro: ['Stretch Pro', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#f7f7f7',
				'black': '#070707',
				'neon-green': '#b3e823',
				'blush-red': '#ee4140',
				'purple-light': '#8f7cff',
				'real-neon-green': '#00FF00',
				'border-white' : '#FAFAFA',
				'grey-stroke': '#9E9E9E',
				'grey-text': '#C0C0C0',
			  },
		},
	},
	plugins: [],
}

