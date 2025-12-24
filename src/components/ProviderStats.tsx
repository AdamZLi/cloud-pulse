import awsLogo from "@/assets/aws.png";
import azureLogo from "@/assets/azure.png";
import gcpLogo from "@/assets/gcp.png";
import { Announcement } from "@/types/announcement";

interface ProviderStatsProps {
  announcements: Announcement[];
}

const providerConfig = {
  AWS: {
    logo: awsLogo,
    bgClass: "bg-aws/10",
    borderClass: "border-aws/20",
    textClass: "text-aws",
  },
  Azure: {
    logo: azureLogo,
    bgClass: "bg-azure/10",
    borderClass: "border-azure/20",
    textClass: "text-azure",
  },
  GCP: {
    logo: gcpLogo,
    bgClass: "bg-gcp-blue/10",
    borderClass: "border-gcp-blue/20",
    textClass: "text-gcp-blue",
  },
};

export function ProviderStats({ announcements }: ProviderStatsProps) {
  const stats = {
    AWS: announcements.filter((a) => a.provider === "AWS").length,
    Azure: announcements.filter((a) => a.provider === "Azure").length,
    GCP: announcements.filter((a) => a.provider === "GCP").length,
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {(Object.keys(stats) as Array<keyof typeof stats>).map((provider) => {
        const config = providerConfig[provider];
        return (
          <div
            key={provider}
            className={`${config.bgClass} ${config.borderClass} border rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="w-10 h-10 rounded-lg bg-card/50 border border-border/30 p-2 flex items-center justify-center">
              <img
                src={config.logo}
                alt={`${provider} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className={`text-2xl font-bold ${config.textClass}`}>{stats[provider]}</p>
              <p className="text-xs text-muted-foreground">{provider}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
