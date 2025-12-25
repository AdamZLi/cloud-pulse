import { Announcement } from "@/types/announcement";
import { formatDate, isNew } from "@/lib/announcements";
import { ExternalLink } from "lucide-react";
import awsLogo from "@/assets/aws.png";
import azureLogo from "@/assets/azure.png";
import gcpLogo from "@/assets/gcp.png";

interface AnnouncementCardProps {
  announcement: Announcement;
  index?: number;
}

const providerLogos: Record<string, string> = {
  AWS: awsLogo,
  Azure: azureLogo,
  GCP: gcpLogo,
};

export function AnnouncementCard({ announcement, index = 0 }: AnnouncementCardProps) {
  const providerClass = `announcement-card-${announcement.provider.toLowerCase()}`;
  const isNewAnnouncement = isNew(announcement.announcement_date);
  
  return (
    <article 
      className={`announcement-card ${providerClass} group`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="p-5 transition-all duration-200 group-hover:pl-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            {/* Provider Logo */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-slate-200 overflow-hidden p-1.5 flex-shrink-0">
              <img 
                src={providerLogos[announcement.provider]}
                alt={`${announcement.provider} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Title */}
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span>{announcement.provider}</span>
                <span>•</span>
                <span>{formatDate(announcement.announcement_date)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {isNewAnnouncement && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                New
              </span>
            )}
            <a
              href={announcement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
              aria-label="View original announcement"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {announcement.content}
        </p>

        {/* Category Tag */}
        <span className="storage-tag">
          {announcement.storage_type}
        </span>
      </div>
    </article>
  );
}
