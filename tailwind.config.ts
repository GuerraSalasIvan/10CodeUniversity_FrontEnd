import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        'menu-bg': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#222222',
        },
        'subtitle-event':{
          '800':'#026c96'
        },
        'danger':{
          '500':'#d33'
        },
        'title-dark': {
          '50': '#f5f7fa',
          '100': '#ebeef3',
          '200': '#d2dae5',
          '300': '#aab9cf',
          '400': '#7c95b4',
          '500': '#5c789b',
          '600': '#485f81',
          '700': '#3f5270',
          '800': '#344358',
          '900': '#2f3a4b',
          '950': '#1f2532',
          },
        'primary': {
          '50': '#f3f7fb',
          '100': '#e3edf6',
          '200': '#cde0f0',
          '300': '#aacbe6',
          '400': '#82b0d8',
          '500': '#6494cd',
          '600': '#5680c1',
          '700': '#466aaf',
          '800': '#3e578f',
          '900': '#364b72',
          '950': '#252f46',
        },
        'secondary': {
          '50': '#f2fbfa',
          '100': '#d4f3f0',
          '200': '#a9e6e2',
          '300': '#75d3d0',
          '400': '#58bebe',
          '500': '#2f9b9d',
          '600': '#247a7d',
          '700': '#206265',
          '800': '#1e4e51',
          '900': '#1d4244',
          '950': '#0b2528',
        },
        'terciary': {
          '50': '#f4f8fb',
          '100': '#e8f0f6',
          '200': '#cbe0ec',
          '300': '#9ec6db',
          '400': '#599ec0',
          '500': '#478eb0',
          '600': '#357294',
          '700': '#2c5b78',
          '800': '#284e64',
          '900': '#254255',
          '950': '#192b38',
        },
        'title-color': {
          '50': '#f1f8fd',
          '100': '#e0eef9',
          '200': '#c8e2f5',
          '300': '#a3cfed',
          '400': '#77b5e3',
          '500': '#579ada',
          '600': '#4280ce',
          '700': '#3a6ec0',
          '800': '#345899',
          '900': '#2e4c7a',
          '950': '#202f4b',
        },
        'sidebar-hover': {
          '50': '#effcfc',
          '100': '#d6f7f7',
          '200': '#adeded',
          '300': '#7ee0e2',
          '400': '#42c9ce',
          '500': '#27adb3',
          '600': '#238d97',
          '700': '#23717b',
          '800': '#245d66',
          '900': '#224d57',
          '950': '#11333b',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
