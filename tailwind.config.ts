import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Existing shadcn/ui colors - preserved for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Apple Design System colors
				apple: {
					'system-bg': 'var(--apple-system-background)',
					'secondary-bg': 'var(--apple-secondary-background)',
					'tertiary-bg': 'var(--apple-tertiary-background)',
					'grouped-bg': 'var(--apple-grouped-background)',
					'separator': 'var(--apple-separator)',
					'label': 'var(--apple-label)',
					'secondary-label': 'var(--apple-secondary-label)',
					'tertiary-label': 'var(--apple-tertiary-label)',
					'blue': 'var(--apple-blue)',
					'green': 'var(--apple-green)',
					'red': 'var(--apple-red)',
					'orange': 'var(--apple-orange)',
					'yellow': 'var(--apple-yellow)',
					'purple': 'var(--apple-purple)',
					'pink': 'var(--apple-pink)',
					'gray': 'var(--apple-gray)',
					'gray2': 'var(--apple-gray2)',
					'gray3': 'var(--apple-gray3)',
					'gray4': 'var(--apple-gray4)',
					'gray5': 'var(--apple-gray5)',
					'gray6': 'var(--apple-gray6)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Apple border radius
				'apple-small': 'var(--apple-radius-small)',
				'apple-medium': 'var(--apple-radius-medium)',
				'apple-large': 'var(--apple-radius-large)',
				'apple-xlarge': 'var(--apple-radius-xlarge)'
			},
			spacing: {
				// Apple 8-point grid spacing
				'apple-1': 'var(--apple-spacing-1)',
				'apple-2': 'var(--apple-spacing-2)',
				'apple-3': 'var(--apple-spacing-3)',
				'apple-4': 'var(--apple-spacing-4)',
				'apple-5': 'var(--apple-spacing-5)',
				'apple-6': 'var(--apple-spacing-6)',
				'apple-8': 'var(--apple-spacing-8)',
				'apple-10': 'var(--apple-spacing-10)',
				'apple-12': 'var(--apple-spacing-12)',
				'apple-16': 'var(--apple-spacing-16)'
			},
			boxShadow: {
				// Apple shadows
				'apple-small': 'var(--apple-shadow-small)',
				'apple-medium': 'var(--apple-shadow-medium)',
				'apple-large': 'var(--apple-shadow-large)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
