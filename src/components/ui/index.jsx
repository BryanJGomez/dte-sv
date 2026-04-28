const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-surface text-text-primary border border-border hover:bg-surface-hover',
  ghost: 'bg-transparent text-primary hover:bg-primary-light',
  danger: 'bg-danger text-white hover:bg-red-700',
  success: 'bg-success text-white hover:bg-green-700',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-xs font-bold',
  md: 'px-6 py-3 text-sm font-bold',
  lg: 'px-9 py-4 text-base font-bold',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-1.5 border-none rounded-md font-bold cursor-pointer transition-all';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const badgeVariants = {
  primary: 'bg-primary-light text-primary',
  warning: 'bg-yellow-50 text-warning',
  success: 'bg-green-50 text-success',
  danger: 'bg-red-50 text-danger',
  default: 'bg-bg text-text-secondary',
};

export const Badge = ({ children, variant = 'default' }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${badgeVariants[variant]}`}
  >
    {children}
  </span>
);

export const FormField = ({ label, error, required, hint, children, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {label && (
      <label className="block text-sm font-bold text-text-primary">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
    )}
    {children}
    {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
    {error && <span className="text-xs text-danger font-medium">{error}</span>}
  </div>
);

export const Input = ({ error, className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2.5 border rounded-md text-sm font-medium bg-white text-text-primary placeholder-text-muted transition-colors ${error
      ? 'border-danger bg-red-50'
      : 'border-border hover:border-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-10'
      } ${className}`}
    {...props}
  />
);

export const Card = ({ children, className = '', padding = true }) => (
  <div
    className={`bg-white border border-border rounded-lg shadow-sm ${padding ? 'p-5' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Divider = () => <div className="h-px bg-border my-4" />;

export const Spinner = () => (
  <div className="inline-flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {icon && <div className="text-5xl mb-4">{icon}</div>}
    <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
    {description && <p className="text-sm text-text-muted mb-6 max-w-md">{description}</p>}
    {action && <div>{action}</div>}
  </div>
);
