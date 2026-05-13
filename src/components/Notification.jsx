import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-emerald-500" />,
  warning: <AlertCircle size={18} className="text-yellow-500" />,
  info: <Info size={18} className="text-blue-500" />,
  error: <X size={18} className="text-red-500" />,
};

const bgColors = {
  success: 'bg-emerald-50 border-emerald-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
  error: 'bg-red-50 border-red-200',
};

export default function Notification() {
  const { notification } = useApp();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColors[notification.type] || bgColors.success} max-w-sm`}>
        {icons[notification.type] || icons.success}
        <span className="text-sm font-medium text-gray-800">{notification.message}</span>
      </div>
    </div>
  );
}
