import React, { useState } from "react";
import { Sidebar, MainGrid, Header, ConfirmDialog } from "@/components";
import { useNotes } from "@/context/notesContext";
import { useNoteModal } from "@/context/noteModalContext";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Trash() {
  const [activeTab, setActiveTab] = useState("notes");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    getTrashedNotes,
    getTrashedNotebooks,
    loading,
    restoreNote,
    restoreNotebook,
    deleteNote,
    deleteNotebook,
    emptyTrash,
  } = useNotes();
  const { openNewNoteModal } = useNoteModal();

  const deletedNotes = getTrashedNotes();
  const deletedNotebooks = getTrashedNotebooks();

  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      const title = (item.title || item.name || "").toLowerCase();
      const content = (item.content || item.description || "").toLowerCase();
      const tags = (item.tags || []).map((tag) => tag.toLowerCase());

      return (
        title.includes(query) ||
        content.includes(query) ||
        tags.some((tag) => tag.includes(query))
      );
    });
  };

  const filteredDeletedNotes = filterItems(deletedNotes);
  const filteredDeletedNotebooks = filterItems(deletedNotebooks);

  const totalItems =
    activeTab === "notes"
      ? filteredDeletedNotes.length
      : filteredDeletedNotebooks.length;

  const handleRestoreNote = async (note) => {
    try {
      if (note.isNotebook) {
        await restoreNotebook(note.$id);
        toast.success("Notebook restored successfully");
      } else {
        await restoreNote(note.$id);
        toast.success("Note restored successfully");
      }
    } catch (error) {
      toast.error("Failed to restore item");
    }
  };

  const handleDeletePermanently = async (note) => {
    try {
      await deleteNote(note.$id);
      toast.success("Note permanently deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleDeleteNotebook = async (notebook) => {
    try {
      await deleteNotebook(notebook.$id);
      toast.success("Notebook permanently deleted");
    } catch (error) {
      toast.error("Failed to delete notebook");
    }
  };

  const handleEmptyTrashClick = () => {
    const totalItems = deletedNotes.length + deletedNotebooks.length;
    if (totalItems === 0) {
      toast.info("Trash is already empty");
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmEmptyTrash = async () => {
    setIsEmptyingTrash(true);
    try {
      await emptyTrash();
      const totalItems = deletedNotes.length + deletedNotebooks.length;
      toast.success(
        `Permanently deleted ${totalItems} item${
          totalItems !== 1 ? "s" : ""
        } from trash`
      );
      setShowConfirmDialog(false);
    } catch (error) {
      toast.error("Failed to empty trash");
    } finally {
      setIsEmptyingTrash(false);
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden h-screen flex">
        <Sidebar activePage="trash" onNewNote={openNewNoteModal} />
        <main className="flex-1 flex items-center justify-center">
          <Spinner className="h-16 w-16 text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-screen flex">
      <Sidebar activePage="trash" onNewNote={openNewNoteModal} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          notesCount={totalItems}
          title="Trash"
          isTrash={true}
          onEmptyTrash={handleEmptyTrashClick}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          view={view}
          onViewChange={setView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MainGrid
          notes={
            activeTab === "notes"
              ? filteredDeletedNotes.map((note) => ({
                  ...note,
                  isTrashed: true,
                }))
              : filteredDeletedNotebooks.map((notebook) => ({
                  ...notebook,
                  isTrashed: true,
                  isNotebook: true,
                }))
          }
          isTrash={true}
          onRestoreNote={handleRestoreNote}
          onDeleteNote={handleDeletePermanently}
          onDeleteNotebook={handleDeleteNotebook}
          view={view}
        />
      </main>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Empty Trash?"
        description={`You are about to permanently delete ${
          deletedNotes.length + deletedNotebooks.length
        } item${
          deletedNotes.length + deletedNotebooks.length !== 1 ? "s" : ""
        } from trash. This action cannot be undone.`}
        confirmText="Delete Permanently"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={isEmptyingTrash}
        onConfirm={handleConfirmEmptyTrash}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  );
}
