import { Sidebar, Header, MainGrid } from "@/components";
import { useNotes } from "@/context/notesContext";
import { useNoteModal } from "@/context/noteModalContext";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useState } from "react";

export default function Favorites() {
  const { getFavoriteNotes, loading, toggleFavorite, trashNote } = useNotes();
  const { openNewNoteModal, openEditNoteModal } = useNoteModal();
  const favoriteNotes = getFavoriteNotes();
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = favoriteNotes.filter((note) => {
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
        <Sidebar activePage="favorites" onNewNote={openNewNoteModal} />
        <main className="flex-1 flex items-center justify-center">
          <Spinner className="h-16 w-16 text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-screen flex">
      <Sidebar activePage="favorites" onNewNote={openNewNoteModal} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          notesCount={filteredNotes.length}
          title="Favorites"
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
