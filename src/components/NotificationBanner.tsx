import { BellRing, X } from "lucide-react";

interface NotificationBannerProps {
  onDismiss: () => void;
}

export function NotificationBanner({ onDismiss }: NotificationBannerProps) {
  return (
    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up">
      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
        <BellRing className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">
          You're subscribed to cloud storage announcements
        </p>
        <p className="text-xs text-slate-500 mt-1">
          You'll receive instant notifications for new announcements from AWS, Azure, and GCP.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
