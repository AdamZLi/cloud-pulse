export interface Announcement {
  id: string;
  provider: "AWS" | "Azure" | "GCP";
  title: string;
  announcement_date: string;
  content: string;
  link: string;
  storage_type: "Object Storage" | "File Storage" | "Block Storage";
  announcement_type: "Feature Update" | "Security/Compliance" | "Availability Update" | "Performance";
  confidence: "high" | "medium" | "low";
  ingestion_date: string;
  last_updated: string;
  is_read: boolean;
  is_archived: boolean;
  notes: string | null;
}

export type Provider = "all" | "AWS" | "Azure" | "GCP";
export type StorageType = "all" | "Object Storage" | "File Storage" | "Block Storage";
export type AnnouncementType = "all" | "Feature Update" | "Security/Compliance" | "Availability Update" | "Performance";
export type DateRange = "24hrs" | "7days" | "30days" | "all";

export interface FilterState {
  provider: Provider;
  storageType: StorageType;
  announcementType: AnnouncementType;
  dateRange: DateRange;
  searchQuery: string;
}
