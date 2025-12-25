import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FilterBar } from "@/components/FilterBar";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { NotificationBanner } from "@/components/NotificationBanner";
import { FilterState } from "@/types/announcement";
import { sampleAnnouncements, filterAnnouncements } from "@/lib/announcements";
import { Inbox } from "lucide-react";

const Index = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    provider: "all",
    storageType: "all",
    announcementType: "all",
    dateRange: "all",
    searchQuery: "",
  });

  const filteredAnnouncements = useMemo(() => {
    return filterAnnouncements(sampleAnnouncements, filters);
  }, [filters]);

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
        lastUpdated="just now"
        isLoading={false}
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
            totalCount={sampleAnnouncements.length}
            filteredCount={filteredAnnouncements.length}
          />
        </div>

        {/* Announcements List */}
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
