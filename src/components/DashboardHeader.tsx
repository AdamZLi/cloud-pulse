import { Bell, BellRing, Cloud, RefreshCw } from "lucide-react";
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
    <header className="glass-panel sticky top-0 z-10 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
              <Cloud className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Cloud Intel
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Storage Announcements Tracker
              </p>
            </div>
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
              className={`transition-all duration-300 ${
                notificationsEnabled
                  ? "bg-availability hover:bg-availability/90 text-primary-foreground shadow-lg shadow-availability/25"
                  : "border-border hover:bg-accent"
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
