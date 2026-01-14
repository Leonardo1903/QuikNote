import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import { useNotes } from "@/context/notesContext";
import { useNoteModal } from "@/context/noteModalContext";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Favorites() {
  const { getFavoriteNotes, loading, toggleFavorite, trashNote } = useNotes();
  const { openNewNoteModal, openEditNoteModal } = useNoteModal();
  const favoriteNotes = getFavoriteNotes();

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
        <Header notesCount={favoriteNotes.length} title="Favorites" />
        <MainGrid
          notes={favoriteNotes}
          onEditNote={openEditNoteModal}
          onToggleFavorite={handleToggleFavorite}
          onTrashNote={handleTrashNote}
        />
      </main>
    </div>
  );
}
