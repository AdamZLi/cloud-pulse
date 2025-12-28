import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Announcement } from "@/types/announcement";

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("Loading...");

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("storage_announcements")
        .select("*")
        .eq("is_archived", false)
        .order("announcement_date", { ascending: false });

      if (error) throw error;

      setAnnouncements(data as Announcement[]);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch announcements");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("storage-announcements-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "storage_announcements",
        },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    announcements,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchAnnouncements,
  };
}
