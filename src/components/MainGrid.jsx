import {
  Pin,
  MoreHorizontal,
  Star,
  RotateCcw,
  FolderX,
  Trash2,
  Trash,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function MainGrid({
  notes,
  isTrash = false,
  onEditNote,
  onToggleFavorite,
  onTrashNote,
  onRestoreNote,
  onDeleteNote,
  onDeleteNotebook,
  view = "grid",
}) {
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
      <div
        className={`${
          view === "grid"
            ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            : "max-w-4xl mx-auto space-y-4"
        } pb-20`}
      >
        {notes.map((note) => {
          const noteId = note.$id || note.id;
          const timeAgo = formatTimeAgo(note.$updatedAt || note.$createdAt);

          return (
            <Card
              key={noteId}
              className={`${
                view === "grid" ? "break-inside-avoid" : "w-full"
              } hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer p-5`}
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

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 whitespace-pre-line">
                  {note.content || note.description || ""}
                </p>

                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(isTrash || note.isNotebook) && (
                      <Badge
                        className={`${
                          isTrash && note.isTrashed
                            ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        } text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wider`}
                      >
                        {isTrash && note.isTrashed ? "Deleted" : "Notebook"}
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400">{timeAgo}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        title="Actions"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isTrash ? (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            if (note.isNotebook) {
                              onDeleteNotebook && onDeleteNotebook(note);
                            } else {
                              onDeleteNote && onDeleteNote(note);
                            }
                          }}
                          className="text-red-600 dark:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete Permanently
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onTrashNote && onTrashNote(note);
                          }}
                          className="cursor-pointer"
                        >
                          <Trash size={16} className="mr-2" />
                          Move to Trash
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
