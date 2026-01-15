import React, { useEffect, useRef, useState } from "react";
import {
  Book,
  ChevronDown,
  ChevronUp,
  Edit2,
  FileText,
  MoreHorizontal,
  Plus,
  Star,
  Trash,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../../public/Logo.png";
import { useNotes } from "@/context/notesContext";
import { useAuth } from "@/context/authContext";
import ConfirmDialog from "./ConfirmDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Sidebar({
  activePage = "all",
  activeNotebook = null,
  onNewNote,
}) {
  const navigate = useNavigate();
  const { notebooks, createNotebook, updateNotebook, trashNotebook } =
    useNotes();
  const { user, profileImageUrl } = useAuth();

  const [showNotebookForm, setShowNotebookForm] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState("");
  const [showNotebooksMenu, setShowNotebooksMenu] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingNotebook, setEditingNotebook] = useState(null);
  const [editName, setEditName] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // menu closed
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateNotebook = async (e) => {
    e.preventDefault();
    if (!newNotebookName.trim()) {
      toast.error("Please enter a notebook name");
      return;
    }

    try {
      const notebook = await createNotebook({ name: newNotebookName.trim() });
      toast.success("Notebook created successfully");
      setNewNotebookName("");
      setShowNotebookForm(false);
      navigate(`/notebook?id=${notebook.$id}`);
    } catch (error) {
      toast.error("Failed to create notebook");
    }
  };

  const handleUpdateNotebook = async (notebookId) => {
    if (!editName.trim()) {
      toast.error("Please enter a notebook name");
      return;
    }

    try {
      await updateNotebook(notebookId, { name: editName.trim() });
      toast.success("Notebook updated successfully");
      setEditingNotebook(null);
      setEditName("");
    } catch (error) {
      toast.error("Failed to update notebook");
    }
  };

  const handleDeleteNotebook = async () => {
    if (!deleteConfirm) return;

    try {
      await trashNotebook(deleteConfirm.$id);
      toast.success("Notebook moved to trash");
      setDeleteConfirm(null);
      if (activeNotebook === deleteConfirm.$id) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to delete notebook");
    }
  };

  const activeNotebooks = notebooks.filter((nb) => !nb.isTrashed);

  return (
    <aside className="w-64 bg-white dark:bg-card h-full flex flex-col border-r border-slate-200 dark:border-slate-800 shrink-0 z-20">
      <div className="p-6 pb-2">
        <div className="flex items-center">
          <img src={Logo} alt="QuikNote Logo" className="w-32 mb-4" />
        </div>
        <Button
          onClick={onNewNote}
          className="w-full bg-primary hover:bg-primary/90 transition-colors text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group"
        >
          <Plus
            className="group-hover:scale-110 transition-transform"
            size={20}
          />
          <span>New Note</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 no-scrollbar">
        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Library
          </h3>
          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium ${
                activePage === "all"
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              }`}
            >
              <FileText size={22} />
              All Notes
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium ${
                activePage === "favorites"
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              }`}
            >
              <Star size={22} />
              Favorites
            </Link>
            <Link
              to="/trash"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium ${
                activePage === "trash"
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              }`}
            >
              <Trash2 size={22} />
              Trash
            </Link>
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 mb-2 group cursor-pointer">
            <button
              onClick={() => setShowNotebooksMenu(!showNotebooksMenu)}
              className="flex items-center gap-2 flex-1 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Notebooks
              {showNotebooksMenu ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            <button
              onClick={() => setShowNotebookForm(!showNotebookForm)}
              className="text-slate-400 hover:text-primary transition-colors"
              title="New notebook"
            >
              <Plus size={16} />
            </button>
          </div>

          {showNotebookForm && (
            <form onSubmit={handleCreateNotebook} className="px-2 pb-2">
              <input
                type="text"
                placeholder="Notebook name..."
                value={newNotebookName}
                onChange={(e) => setNewNotebookName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button type="submit" className="flex-1 h-8 text-sm">
                  Create
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowNotebookForm(false);
                    setNewNotebookName("");
                  }}
                  className="flex-1 h-8 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {showNotebooksMenu && (
            <nav className="space-y-1">
              {activeNotebooks.length === 0 ? (
                <div className="px-4 py-2 text-sm text-slate-400 italic">
                  No notebooks yet
                </div>
              ) : (
                activeNotebooks.map((notebook) => (
                  <div key={notebook.$id} className="relative">
                    {editingNotebook === notebook.$id ? (
                      <div className="px-2 py-1">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateNotebook(notebook.$id);
                            } else if (e.key === "Escape") {
                              setEditingNotebook(null);
                              setEditName("");
                            }
                          }}
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            onClick={() => handleUpdateNotebook(notebook.$id)}
                            className="flex-1 h-8 text-sm"
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setEditingNotebook(null);
                              setEditName("");
                            }}
                            className="flex-1 h-8 text-sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center group">
                        <Link
                          to={`/notebook?id=${notebook.$id}`}
                          className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                            activeNotebook === notebook.$id
                              ? "bg-primary/10 text-primary"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <Book
                            className={`${
                              activeNotebook === notebook.$id
                                ? "text-primary"
                                : "text-slate-400"
                            }`}
                            size={18}
                          />
                          <span className="truncate">{notebook.name}</span>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => e.stopPropagation()}
                              className="opacity-0 group-hover:opacity-100 h-auto w-auto p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
                              title="Options"
                            >
                              <MoreHorizontal size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNotebook(notebook.$id);
                                setEditName(notebook.name);
                              }}
                              className="cursor-pointer"
                            >
                              <Edit2 size={16} className="mr-2" />
                              Edit Name
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(notebook);
                              }}
                              className="text-red-600 dark:text-red-400 cursor-pointer"
                            >
                              <Trash size={16} className="mr-2" />
                              Move to Trash
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                ))
              )}
            </nav>
          )}
        </div>
      </div>

      <Separator />

      <div className="px-4 pb-4 pt-3 bg-white dark:bg-card">
        <Link
          to="/profile"
          className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent"
        >
          <Avatar className="size-10 border-2 border-white dark:border-slate-700 shadow-sm">
            <AvatarImage
              src={profileImageUrl}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm font-bold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-slate-500">Pro Plan</span>
          </div>
          <ChevronDown className="ml-auto text-slate-400" size={18} />
        </Link>
      </div>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Move notebook to trash?"
        description={`"${
          deleteConfirm?.name || ""
        }" will be moved to the trash.`}
        confirmText="Move to Trash"
        cancelText="Cancel"
        icon={<Trash className="text-red-500" size={20} />}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteNotebook}
      />
    </aside>
  );
}
