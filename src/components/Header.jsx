import React from "react";
import {
  Search,
  LayoutGrid,
  List,
  ArrowDownUp,
  ChevronDown,
  FileText,
  FolderX,
} from "lucide-react";

export default function Header({
  notesCount,
  title = "All Notes",
  isTrash = false,
  onEmptyTrash,
  activeTab = "notes",
  onTabChange,
}) {
  return (
    <header className="flex-shrink-0 px-8 py-5 flex flex-col gap-6 z-10 bg-background/90 dark:bg-background/90 backdrop-blur-md sticky top-0">
      <div className="flex justify-between items-center gap-6">
        {/* Search Bar */}
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
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-card p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex">
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-primary shadow-sm">
              <LayoutGrid size={20} />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
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

      {/* Trash Tabs */}
      {isTrash && (
        <div className="border-b border-slate-200 dark:border-slate-800 -mx-8 px-8">
          <div className="flex space-x-6 -mb-px">
            <button
              onClick={() => onTabChange("notes")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "notes"
                  ? "text-primary border-primary"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <FileText className="inline-block align-bottom mr-1" size={20} />
              Deleted Notes
            </button>
            <button
              onClick={() => onTabChange("notebooks")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "notebooks"
                  ? "text-primary border-primary"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <FolderX className="inline-block align-bottom mr-1" size={20} />
              Deleted Notebooks
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
