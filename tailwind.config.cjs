const colors = require('tailwindcss/colors')

let grayColors = colors.zinc;

const disabledCss = {
	'code::before': false,
	'code::after': false
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': "Noto Sans, sans-serif"
		},
		extend: {
			colors: {
				gray: grayColors
			},
			typography: {
				DEFAULT: { css: disabledCss },
				sm: { css: disabledCss },
				lg: { css: disabledCss },
				xl: { css: disabledCss },
				'2xl': { css: disabledCss },
			}
		},
	},
	darkMode: 'class',
	plugins: [require("@tailwindcss/typography")],
}
