import { BellRing, X } from "lucide-react";

interface NotificationBannerProps {
  onDismiss: () => void;
}

export function NotificationBanner({ onDismiss }: NotificationBannerProps) {
  return (
    <div className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <BellRing className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">
          You're subscribed to cloud storage announcements
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          You'll receive instant notifications for new announcements from AWS, Azure, and GCP.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
