import { Announcement } from "@/types/announcement";
import { formatDate, getRelativeTime } from "@/lib/announcements";
import { ExternalLink, Calendar, Shield, Zap, Globe, Sparkles } from "lucide-react";
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

const getAnnouncementTypeIcon = (type: string) => {
  switch (type) {
    case "Feature Update":
      return <Sparkles className="w-3 h-3" />;
    case "Security/Compliance":
      return <Shield className="w-3 h-3" />;
    case "Availability Update":
      return <Globe className="w-3 h-3" />;
    case "Performance":
      return <Zap className="w-3 h-3" />;
    default:
      return null;
  }
};

const getAnnouncementTypeClass = (type: string) => {
  switch (type) {
    case "Feature Update":
      return "announcement-type-feature";
    case "Security/Compliance":
      return "announcement-type-security";
    case "Availability Update":
      return "announcement-type-availability";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function AnnouncementCard({ announcement, index = 0 }: AnnouncementCardProps) {
  const providerClass = `announcement-card-${announcement.provider.toLowerCase()}`;
  
  return (
    <article 
      className={`announcement-card ${providerClass} group`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5 sm:p-6 transition-all duration-300 group-hover:pl-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Provider Logo */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary/80 border border-border/50 shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden p-2">
              <img 
                src={providerLogos[announcement.provider]}
                alt={`${announcement.provider} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`provider-badge provider-badge-${announcement.provider.toLowerCase()}`}>
                {announcement.provider}
              </span>
              
              <span className="text-muted-foreground/40 hidden sm:inline">•</span>
              
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{formatDate(announcement.announcement_date)}</span>
                <span className="sm:hidden">{getRelativeTime(announcement.announcement_date)}</span>
              </span>
              
              <span className="text-muted-foreground/40 hidden sm:inline">•</span>
              
              <span className="storage-tag hidden sm:inline-flex">
                {announcement.storage_type}
              </span>
            </div>
          </div>
          
          <a
            href={announcement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent flex-shrink-0"
            aria-label="View original announcement"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
          {announcement.title}
        </h3>

        {/* Content */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {announcement.content}
        </p>

        {/* Footer Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`announcement-type-tag ${getAnnouncementTypeClass(announcement.announcement_type)}`}>
            {getAnnouncementTypeIcon(announcement.announcement_type)}
            {announcement.announcement_type}
          </span>
          
          <span className="storage-tag sm:hidden">
            {announcement.storage_type}
          </span>

          {!announcement.is_read && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              New
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
