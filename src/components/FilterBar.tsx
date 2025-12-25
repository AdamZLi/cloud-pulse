import { FilterState, Provider, StorageType, DateRange } from "@/types/announcement";
import { Search, X } from "lucide-react";
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
  { value: "all", label: "All Categories" },
  { value: "Block Storage", label: "Block Storage" },
  { value: "Object Storage", label: "Object Storage" },
  { value: "File Storage", label: "File Storage" },
];

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "24hrs", label: "Last 24 Hours" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
];

export function FilterBar({ filters, onFiltersChange, totalCount, filteredCount }: FilterBarProps) {
  const hasActiveFilters = 
    filters.provider !== "all" || 
    filters.storageType !== "all" || 
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search announcements..."
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className="pl-10 pr-4 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFiltersChange({ ...filters, searchQuery: "" })}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500">Filter:</span>

        {/* Provider Select */}
        <select
          value={filters.provider}
          onChange={(e) => onFiltersChange({ ...filters, provider: e.target.value as Provider })}
          className="filter-select"
        >
          {providers.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Category Select */}
        <select
          value={filters.storageType}
          onChange={(e) => onFiltersChange({ ...filters, storageType: e.target.value as StorageType })}
          className="filter-select"
        >
          {storageTypes.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Date Range Select */}
        <select
          value={filters.dateRange}
          onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value as DateRange })}
          className="filter-select"
        >
          {dateRanges.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>

        <span className="text-slate-300">|</span>

        {/* Results count */}
        <span className="text-sm text-slate-500">
          <span className="font-medium text-slate-900">{filteredCount}</span> announcements
        </span>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-8 px-2"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
