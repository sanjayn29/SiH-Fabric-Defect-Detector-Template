interface StatusBadgeProps {
  status: 'Pass' | 'Fail' | 'Accepted' | 'Rework' | 'Rejected' | 'Running' | 'Stopped';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const colorClasses = {
    Pass: 'bg-green-100 text-green-800',
    Fail: 'bg-red-100 text-red-800',
    Accepted: 'bg-green-100 text-green-800',
    Rework: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
    Running: 'bg-blue-100 text-blue-800',
    Stopped: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClasses[size]} ${colorClasses[status]}`}>
      {status}
    </span>
  );
}
