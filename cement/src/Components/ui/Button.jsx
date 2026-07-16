export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const baseClass = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all';
  const variantClass =
    variant === 'secondary'
      ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      : 'bg-orange-500 text-white hover:bg-orange-600';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
