import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNotes } from "@/context/notesContext";
import { toast } from "sonner";

export default function NoteModal({ isOpen, onClose, note = null }) {
  const { createNote, updateNote, notebooks } = useNotes();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    notebookId: "",
  });
  const [loading, setLoading] = useState(false);

  const isEditMode = !!note;

  useEffect(() => {
    if (note) {
      const resolvedNotebookId = Array.isArray(note.notebooks)
        ? typeof note.notebooks[0] === "string"
          ? note.notebooks[0]
          : note.notebooks[0]?.$id || ""
        : typeof note.notebooks === "string"
        ? note.notebooks
        : note.notebooks?.$id || "";

      setFormData({
        title: note.title || "",
        content: note.content || "",
        notebookId: resolvedNotebookId,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        notebookId: "",
      });
    }
  }, [note, isOpen]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    setLoading(true);
    try {
      const noteData = {
        title: formData.title,
        content: formData.content,
        // For one-to-many relationship, send single ID or null
        notebooks: formData.notebookId || null,
        isFavorite: note?.isFavorite || false,
        isTrashed: false,
      };

      if (isEditMode) {
        await updateNote(note.$id, noteData);
        toast.success("Note updated successfully!");
      } else {
        await createNote(noteData);
        toast.success("Note created successfully!");
      }

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl ring-1 ring-slate-900/5 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 pb-6">
          {/* Title Input */}
          <input
            className="w-full text-4xl font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 border-none focus:ring-0 p-0 bg-transparent mb-6 tracking-tight outline-none"
            placeholder="Untitled Note"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          {/* Content Textarea */}
          <textarea
            className="w-full min-h-[300px] resize-none border-none focus:ring-0 p-0 bg-transparent placeholder-slate-400 text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 outline-none"
            placeholder="Start typing your note here..."
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>

          {/* Metadata Section */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            {/* Notebook Selection */}
            <div className="flex items-center gap-4">
              <label className="w-20 text-sm font-medium text-slate-500">
                Notebook
              </label>
              <div className="relative group">
                <select
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none appearance-none pr-8"
                  value={formData.notebookId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notebookId: e.target.value,
                    }))
                  }
                >
                  <option value="">No Notebook</option>
                  {notebooks
                    .filter((nb) => !nb.isTrashed)
                    .map((notebook) => (
                      <option key={notebook.$id} value={notebook.$id}>
                        {notebook.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Note"
                : "Create Note"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
