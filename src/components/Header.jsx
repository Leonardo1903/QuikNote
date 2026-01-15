import React from "react";
import { Search, LayoutGrid, List, FileText, FolderX } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Header({
  notesCount,
  title = "All Notes",
  isTrash = false,
  onEmptyTrash,
  activeTab = "notes",
  onTabChange,
  view = "grid",
  onViewChange,
  searchQuery = "",
  onSearchChange,
}) {
  return (
    <header className="flex-shrink-0 px-8 py-5 flex flex-col gap-6 z-10 bg-background/90 dark:bg-background/90 backdrop-blur-md sticky top-0">
      <div className="flex justify-between items-center gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className="text-slate-400 group-focus-within:text-primary transition-colors"
                size={20}
              />
            </div>
            <input
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-card border-none rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
              placeholder="Search by title, content, or tag..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-card p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex">
            <button
              onClick={() => onViewChange && onViewChange("grid")}
              className={`p-2 rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-slate-100 dark:bg-slate-700 text-primary shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => onViewChange && onViewChange("list")}
              className={`p-2 rounded-lg transition-colors ${
                view === "list"
                  ? "bg-slate-100 dark:bg-slate-700 text-primary shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 mb-1">
            {notesCount} {isTrash ? "items" : "notes"}
          </span>
          {isTrash && (
            <button
              onClick={onEmptyTrash}
              className="text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors mb-0.5"
            >
              Empty Trash
            </button>
          )}
        </div>
      </div>

      {isTrash && (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="notes" className="gap-1.5">
              <FileText size={16} />
              Deleted Notes
            </TabsTrigger>
            <TabsTrigger value="notebooks" className="gap-1.5">
              <FolderX size={16} />
              Deleted Notebooks
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    </header>
  );
}
