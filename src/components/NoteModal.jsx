import { useState, useEffect } from "react";
import { useNotes } from "@/context/notesContext";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        notebookId: resolvedNotebookId || "none",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        notebookId: "none",
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
        notebooks: formData.notebookId === "none" ? null : formData.notebookId,
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isEditMode ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Note Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          <div>
            <textarea
              placeholder="Start typing your note..."
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full min-h-75 bg-transparent border-none outline-none resize-none text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Notebook
            </label>
            <Select
              value={formData.notebookId || "none"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  notebookId: value === "none" ? "" : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a notebook" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Notebook</SelectItem>
                {notebooks
                  .filter((nb) => !nb.isTrashed)
                  .map((notebook) => (
                    <SelectItem key={notebook.$id} value={notebook.$id}>
                      {notebook.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditMode ? "Update Note" : "Create Note"}
          </button>
        </div>
      </Card>
    </div>
  );
}
