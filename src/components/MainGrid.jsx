import React, { useState, useRef, useEffect } from "react";
import {
  Pin,
  MoreHorizontal,
  Square,
  Star,
  RotateCcw,
  FolderX,
  Trash2,
  Trash,
} from "lucide-react";
import { formatTimeAgo, getCategoryColor } from "@/lib/utils";

export default function MainGrid({
  notes,
  isTrash = false,
  onEditNote,
  onToggleFavorite,
  onTrashNote,
  onRestoreNote,
  onDeleteNote,
  onDeleteNotebook,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const categoryColors = {
    indigo:
      "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300",
    orange:
      "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300",
    purple:
      "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300",
    slate: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
    red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300",
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!notes || notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 dark:text-slate-500 text-lg font-medium">
            No notes found
          </p>
          <p className="text-slate-300 dark:text-slate-600 text-sm mt-2">
            Create your first note to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 pb-10 scroll-smooth">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
        {notes.map((note) => {
          // Use $id from Appwrite or fall back to id
          const noteId = note.$id || note.id;
          const timeAgo = formatTimeAgo(note.$updatedAt || note.$createdAt);
          const categoryColor = getCategoryColor(note.category);

          return (
            <div
              key={noteId}
              className="break-inside-avoid bg-white dark:bg-card rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer relative"
            >
              <div
                onClick={() => !isTrash && onEditNote && onEditNote(note)}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  {note.isNotebook && isTrash ? (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <FolderX className="text-primary" size={22} />
                      <h3 className="font-bold text-lg leading-tight truncate">
                        {note.title || note.name}
                      </h3>
                    </div>
                  ) : (
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight pr-4 truncate">
                      {note.title || note.name}
                    </h3>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isTrash) {
                        onRestoreNote && onRestoreNote(note);
                      } else {
                        onToggleFavorite && onToggleFavorite(note);
                      }
                    }}
                    className={`${
                      isTrash
                        ? "opacity-0 group-hover:opacity-100"
                        : note.isFavorite
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity ${
                      isTrash
                        ? "text-slate-400 hover:text-primary"
                        : note.isFavorite
                        ? "text-yellow-400 hover:text-yellow-500"
                        : "text-slate-400 hover:text-primary"
                    } absolute top-5 right-5`}
                    title={
                      isTrash
                        ? "Restore"
                        : note.isFavorite
                        ? "Unfavorite"
                        : "Favorite"
                    }
                  >
                    {isTrash ? (
                      <RotateCcw size={20} />
                    ) : note.isFavorite ? (
                      <Star size={20} fill="currentColor" />
                    ) : (
                      <Pin size={20} />
                    )}
                  </button>
                </div>

                {/* Note Content */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 whitespace-pre-line">
                  {note.content || note.description || ""}
                </p>

                {/* Note Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${
                        isTrash && note.isTrashed
                          ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                          : categoryColors[categoryColor] ||
                            categoryColors.slate
                      } text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wider`}
                    >
                      {isTrash && note.isTrashed
                        ? "Deleted"
                        : note.isNotebook
                        ? "Notebook"
                        : note.category || "General"}
                    </span>
                    <span className="text-xs text-slate-400">{timeAgo}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === noteId ? null : noteId);
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors relative"
                  title="Actions"
                >
                  <MoreHorizontal size={20} />

                  {/* Dropdown Menu */}
                  {openMenuId === noteId && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50"
                    >
                      {isTrash ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (note.isNotebook) {
                                onDeleteNotebook && onDeleteNotebook(note);
                              } else {
                                onDeleteNote && onDeleteNote(note);
                              }
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete Permanently
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onTrashNote && onTrashNote(note);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                          >
                            <Trash size={16} />
                            Move to Trash
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
