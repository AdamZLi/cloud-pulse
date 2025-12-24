import { FilterState, Provider, StorageType, AnnouncementType, DateRange } from "@/types/announcement";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

const providers: { value: Provider; label: string }[] = [
  { value: "all", label: "All Providers" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  { value: "GCP", label: "GCP" },
];

const storageTypes: { value: StorageType; label: string }[] = [
  { value: "all", label: "All Storage" },
  { value: "Block Storage", label: "Block" },
  { value: "Object Storage", label: "Object" },
  { value: "File Storage", label: "File" },
];

const announcementTypes: { value: AnnouncementType; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "Feature Update", label: "Feature" },
  { value: "Security/Compliance", label: "Security" },
  { value: "Availability Update", label: "Availability" },
];

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "24hrs", label: "24h" },
  { value: "7days", label: "7 days" },
  { value: "30days", label: "30 days" },
  { value: "all", label: "All time" },
];

export function FilterBar({ filters, onFiltersChange, totalCount, filteredCount }: FilterBarProps) {
  const hasActiveFilters = 
    filters.provider !== "all" || 
    filters.storageType !== "all" || 
    filters.announcementType !== "all" ||
    filters.dateRange !== "all" ||
    filters.searchQuery !== "";

  const clearFilters = () => {
    onFiltersChange({
      provider: "all",
      storageType: "all",
      announcementType: "all",
      dateRange: "all",
      searchQuery: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search announcements..."
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className="pl-11 pr-4 py-3 h-12 bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFiltersChange({ ...filters, searchQuery: "" })}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Provider Filter */}
        <div className="flex gap-1.5 flex-wrap">
          {providers.map((p) => (
            <button
              key={p.value}
              onClick={() => onFiltersChange({ ...filters, provider: p.value })}
              className={`filter-chip ${
                filters.provider === p.value ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <span className="text-border hidden sm:block">|</span>

        {/* Storage Type Filter */}
        <div className="flex gap-1.5 flex-wrap">
          {storageTypes.map((s) => (
            <button
              key={s.value}
              onClick={() => onFiltersChange({ ...filters, storageType: s.value })}
              className={`filter-chip ${
                filters.storageType === s.value ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <span className="text-border hidden sm:block">|</span>

        {/* Announcement Type Filter */}
        <div className="flex gap-1.5 flex-wrap">
          {announcementTypes.map((a) => (
            <button
              key={a.value}
              onClick={() => onFiltersChange({ ...filters, announcementType: a.value })}
              className={`filter-chip ${
                filters.announcementType === a.value ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <span className="text-border hidden sm:block">|</span>

        {/* Date Range Filter */}
        <div className="flex gap-1.5 flex-wrap">
          {dateRanges.map((d) => (
            <button
              key={d.value}
              onClick={() => onFiltersChange({ ...filters, dateRange: d.value })}
              className={`filter-chip ${
                filters.dateRange === d.value ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count & clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> announcements
        </p>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
