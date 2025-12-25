import { Bell, BellRing, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  lastUpdated?: string;
  isLoading?: boolean;
}

export function DashboardHeader({
  notificationsEnabled,
  onToggleNotifications,
  lastUpdated,
  isLoading,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Competitive Intelligence
            </h1>
            <p className="text-sm text-muted-foreground">
              Cloud Storage Announcements
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Sync Status */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="sync-pulse">
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </div>
              <span className="hidden sm:inline">
                {lastUpdated ? `Synced ${lastUpdated}` : 'Live sync'}
              </span>
            </div>

            {/* Notifications Toggle */}
            <Button
              onClick={onToggleNotifications}
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-200 ${
                notificationsEnabled
                  ? "bg-primary hover:bg-primary/90"
                  : "border-border hover:bg-muted"
              }`}
            >
              {notificationsEnabled ? (
                <>
                  <BellRing className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Notifications On</span>
                  <span className="sm:hidden">On</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Get Notified</span>
                  <span className="sm:hidden">Notify</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
