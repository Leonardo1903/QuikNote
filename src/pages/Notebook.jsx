import { Sidebar, Header, MainGrid } from "@/components";
import { useNotes } from "@/context/notesContext";
import { useNoteModal } from "@/context/noteModalContext";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function Notebook() {
  const [searchParams] = useSearchParams();
  const notebookId = searchParams.get("id");
  const { notes, notebooks, loading, toggleFavorite, trashNote } = useNotes();
  const { openNewNoteModal, openEditNoteModal } = useNoteModal();
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const notebookNotes = notebookId
    ? notes.filter((note) => !note.isTrashed && note.notebooks === notebookId)
    : [];

  const currentNotebook = notebooks.find((nb) => nb.$id === notebookId);
  const notebookName = currentNotebook?.name || "Notebook";

  const filteredNotes = notebookNotes.filter((note) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const title = (note.title || "").toLowerCase();
    const content = (note.content || "").toLowerCase();
    const tags = (note.tags || []).map((tag) => tag.toLowerCase());

    return (
      title.includes(query) ||
      content.includes(query) ||
      tags.some((tag) => tag.includes(query))
    );
  });

  const handleToggleFavorite = async (note) => {
    try {
      await toggleFavorite(note.$id, !note.isFavorite);
      toast.success(
        note.isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  const handleTrashNote = async (note) => {
    try {
      await trashNote(note.$id);
      toast.success("Note moved to trash");
    } catch (error) {
      toast.error("Failed to trash note");
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden h-screen flex">
        <Sidebar
          activePage="notebook"
          activeNotebook={notebookId}
          onNewNote={openNewNoteModal}
        />
        <main className="flex-1 flex items-center justify-center">
          <Spinner className="h-16 w-16 text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-screen flex">
      <Sidebar
        activePage="notebook"
        activeNotebook={notebookId}
        onNewNote={openNewNoteModal}
      />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          notesCount={filteredNotes.length}
          title={notebookName}
          view={view}
          onViewChange={setView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MainGrid
          notes={filteredNotes}
          onEditNote={openEditNoteModal}
          onToggleFavorite={handleToggleFavorite}
          onTrashNote={handleTrashNote}
          view={view}
        />
      </main>
    </div>
  );
}
