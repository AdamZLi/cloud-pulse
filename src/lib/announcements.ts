import { Announcement, FilterState } from "@/types/announcement";
import { subDays, parseISO, isAfter } from "date-fns";

export const sampleAnnouncements: Announcement[] = [
  {
    id: "310f43e9-e4a8-45b5-acd1-903528562168",
    provider: "Azure",
    title: "Public Preview: Azure Blob-to-Blob migration made simple with Azure Storage Mover",
    announcement_date: "2025-12-18T18:45:03+00:00",
    content: "Azure Storage Mover's new Azure Blob container-to-container migration feature is now in Public Preview, empowering organizations to move data between two Blob containers within the same or different storage accounts, subscriptions or Azure regions securely.",
    link: "https://azure.microsoft.com/updates?id=542813",
    storage_type: "Object Storage",
    announcement_type: "Feature Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "502cffc6-ecd9-4089-b99e-53278d30cc44",
    provider: "Azure",
    title: "Public Preview: Azure NetApp Files advanced ransomware protection",
    announcement_date: "2025-12-16T15:45:45+00:00",
    content: "Azure NetApp Files advanced ransomware protection (ANF ARP) is now in Public Preview. ANF ARP is designed to help organizations proactively detect, respond to, and recover from ransomware threats on cloud volumes. ANF ARP monitors Azure NetApp Files volumes for suspicious activity.",
    link: "https://azure.microsoft.com/updates?id=536699",
    storage_type: "File Storage",
    announcement_type: "Security/Compliance",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "7653f1e0-3b18-49d7-9ed3-660394706f40",
    provider: "Azure",
    title: "Generally Available: Azure NetApp Files cross-zone-region replication (CZRR)",
    announcement_date: "2025-12-16T15:45:45+00:00",
    content: "Cross-zone-region replication builds on the existing capabilities of cross-region replication and cross-zone replication. It enables you to replicate volumes across regions and across availability zones within the same region, combining disaster recovery.",
    link: "https://azure.microsoft.com/updates?id=537106",
    storage_type: "File Storage",
    announcement_type: "Availability Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "aws-i7i-instances",
    provider: "AWS",
    title: "Amazon EC2 I7i instances now available in additional AWS regions",
    announcement_date: "2025-12-11T08:00:00+00:00",
    content: "Amazon Web Services (AWS) announces the availability of high performance Storage Optimized Amazon EC2 I7i instances in AWS Asia Pacific (Singapore, Jakarta), Europe (Stockholm) regions. Powered by 5th generation Intel Xeon Scalable processors with an all-core turbo frequency of 3.2 GHz.",
    link: "https://aws.amazon.com/about-aws/whats-new/",
    storage_type: "Block Storage",
    announcement_type: "Availability Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "gcp-hyperdisk",
    provider: "GCP",
    title: "Hyperdisk Extreme now available in 5 additional regions",
    announcement_date: "2025-12-15T10:00:00+00:00",
    content: "Google Cloud has expanded Hyperdisk Extreme availability to Asia-Pacific and European regions, offering up to 350,000 IOPS and 14 GB/s throughput per disk for the most demanding workloads.",
    link: "https://cloud.google.com/products",
    storage_type: "Block Storage",
    announcement_type: "Availability Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "aws-s3-express",
    provider: "AWS",
    title: "Amazon S3 Express One Zone launches in 3 new regions",
    announcement_date: "2025-12-19T08:00:00+00:00",
    content: "AWS expands S3 Express One Zone availability to additional regions, offering single-digit millisecond latency for frequently accessed data with same-region processing capabilities.",
    link: "https://aws.amazon.com/about-aws/whats-new/",
    storage_type: "Object Storage",
    announcement_type: "Feature Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
  {
    id: "gcp-filestore",
    provider: "GCP",
    title: "Cloud Filestore Enterprise tier adds snapshot scheduling",
    announcement_date: "2025-12-18T10:00:00+00:00",
    content: "Google Cloud adds automated snapshot scheduling for Filestore Enterprise, enabling customizable backup policies with retention management and cross-region replication for enhanced data protection.",
    link: "https://cloud.google.com/products",
    storage_type: "File Storage",
    announcement_type: "Feature Update",
    confidence: "high",
    ingestion_date: "2025-12-24T14:46:33.22416+00:00",
    last_updated: "2025-12-24T14:46:33.22416+00:00",
    is_read: false,
    is_archived: false,
    notes: null,
  },
];

export function filterAnnouncements(announcements: Announcement[], filters: FilterState): Announcement[] {
  return announcements.filter((announcement) => {
    // Provider filter
    if (filters.provider !== "all" && announcement.provider !== filters.provider) {
      return false;
    }

    // Storage type filter
    if (filters.storageType !== "all" && announcement.storage_type !== filters.storageType) {
      return false;
    }

    // Announcement type filter
    if (filters.announcementType !== "all" && announcement.announcement_type !== filters.announcementType) {
      return false;
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const announcementDate = parseISO(announcement.announcement_date);
      const now = new Date();
      let cutoffDate: Date;

      switch (filters.dateRange) {
        case "24hrs":
          cutoffDate = subDays(now, 1);
          break;
        case "7days":
          cutoffDate = subDays(now, 7);
          break;
        case "30days":
          cutoffDate = subDays(now, 30);
          break;
        default:
          cutoffDate = new Date(0);
      }

      if (!isAfter(announcementDate, cutoffDate)) {
        return false;
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = announcement.title.toLowerCase().includes(query);
      const matchesContent = announcement.content.toLowerCase().includes(query);
      const matchesProvider = announcement.provider.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesContent && !matchesProvider) {
        return false;
      }
    }

    return true;
  });
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getRelativeTime(dateString: string): string {
  const date = parseISO(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return formatDate(dateString);
}
