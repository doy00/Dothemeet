import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: 'var(--font-pretendard)',
      },
      fontSize: {
        'title-1': ['24px', { lineHeight: '32px' }],
        'title-2': ['22px', { lineHeight: '28px' }],
        'heading-1': ['20px', { lineHeight: '26px' }],
        'heading-2': ['18x', { lineHeight: '24px' }],
        'body-1-normal': ['16px', { lineHeight: '20px' }],
        'body-1-reading': ['16px', { lineHeight: '26px' }],
        'body-2-normal': ['14px', { lineHeight: '20px' }],
        'body-2-reading': ['14px', { lineHeight: '24px' }],
        'label-normal': ['13px', { lineHeight: '18px' }],
        'label-reading': ['13px', { lineHeight: '20px' }],
        'caption-normal': ['12px', { lineHeight: '18px' }],
        'caption-reading': ['12px', { lineHeight: '20px' }],
      },
      screens: {
        xs: '460px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        brown100: '#FFFBF5',
        brown200: '#EDDCBF',
        brown300: '#38342D',
        brown400: '#FF8820',

        orange100: '#FFFBF5',
        orange200: '#ED9141',
        orange300: '#3D332B',
        orange400: '#292521',

        olive100: '#FCFFF5',
        olive200: '#BEE56E',
        olive300: '#383D2D',
        olive400: '#262921',

        blue100: '#F5FCFF',
        blue200: '#5CC3E5',
        blue300: '#2D393D',
        blue400: '#212729',

        red100: '#FFF6F5',
        red200: '#F07560',
        red300: '#3D302D',
        red400: '#292221',

        purple100: '#E9E1FA',
        purple200: '#BEA0FA',
        purple300: '#864BFA',

        gray50: '#F8F7F7',
        gray100: '#F0EFEE',
        gray200: '#DEDBD9',
        gray300: '#C1BDB8',
        gray400: '#837C74',
        gray500: '#837C74',
        gray600: '#6B655E',
        gray700: '#57524D',
        gray800: '#4A4642',
        gray900: '#403D3A',
        gray950: '#2B2926',

        textNormal: '#26262B',
        textAlter1: '#3A3A40',
        textAlter2: '#42424A',
        textAlter3: '#4D4E57',

        background100: '#FFFFFF',
        background200: '#FBFAF9',
        background300: '#FAF6F3',
        background400: '#F2EFEB',
      },
    },
  },
  plugins: [],
} satisfies Config;
