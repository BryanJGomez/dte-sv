// Configuración de Tailwind CSS
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f7f8fc',
        surface: '#ffffff',
        'surface-hover': '#f0f2f8',
        'border': '#e4e7f0',
        'border-light': '#eef0f6',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        primary: '#2563eb',
        'primary-hover': '#1d4ed8',
        'primary-light': '#eff6ff',
        'primary-muted': '#bfdbfe',
        success: '#16a34a',
        'success-light': '#f0fdf4',
        'success-border': '#bbf7d0',
        danger: '#dc2626',
        'danger-light': '#fef2f2',
        warning: '#d97706',
        'warning-light': '#fffbeb',
        'iva-accent': '#7c3aed',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 30px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.04)',
        btn: '0 4px 12px rgba(37, 99, 235, 0.3)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease forwards',
        slideIn: 'slideInRight 0.3s ease forwards',
        spin: 'spin 0.7s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}