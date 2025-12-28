import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FilterBar } from "@/components/FilterBar";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { NotificationBanner } from "@/components/NotificationBanner";
import { FilterState } from "@/types/announcement";
import { filterAnnouncements } from "@/lib/announcements";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Inbox, AlertCircle } from "lucide-react";

const Index = () => {
  const { announcements, isLoading, error, lastUpdated } = useAnnouncements();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    provider: "all",
    storageType: "all",
    announcementType: "all",
    dateRange: "all",
    searchQuery: "",
  });

  const filteredAnnouncements = useMemo(() => {
    return filterAnnouncements(announcements, filters);
  }, [announcements, filters]);

  // Sort by date, newest first
  const sortedAnnouncements = useMemo(() => {
    return [...filteredAnnouncements].sort(
      (a, b) => new Date(b.announcement_date).getTime() - new Date(a.announcement_date).getTime()
    );
  }, [filteredAnnouncements]);

  return (
    <div className="min-h-screen">
      <DashboardHeader
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
        lastUpdated={lastUpdated}
        isLoading={isLoading}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Notification Banner */}
        {notificationsEnabled && (
          <NotificationBanner onDismiss={() => setNotificationsEnabled(false)} />
        )}

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={announcements.length}
            filteredCount={filteredAnnouncements.length}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Announcements List */
          <div className="space-y-4">
            {sortedAnnouncements.length > 0 ? (
              sortedAnnouncements.map((announcement, index) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  index={index}
                />
              ))
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                  <Inbox className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No announcements found
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Try adjusting your filters or search query to see more results.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-500">
            Cloud Intel tracks announcements from AWS, Azure, and GCP. Data refreshed daily via n8n workflows.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
