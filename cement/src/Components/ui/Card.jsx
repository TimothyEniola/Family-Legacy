export default function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`.trim()}>{children}</div>;
}
