import { Sidebar, Header, MainGrid } from "@/components";
import { useNotes } from "@/context/notesContext";
import { useNoteModal } from "@/context/noteModalContext";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Notebook() {
  const [searchParams] = useSearchParams();
  const notebookId = searchParams.get("id");
  const { notes, notebooks, loading, toggleFavorite, trashNote } = useNotes();
  const { openNewNoteModal, openEditNoteModal } = useNoteModal();

  const notebookNotes = notebookId
    ? notes.filter((note) => !note.isTrashed && note.notebooks === notebookId)
    : [];

  const currentNotebook = notebooks.find((nb) => nb.$id === notebookId);
  const notebookName = currentNotebook?.name || "Notebook";

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
        <Header notesCount={notebookNotes.length} title={notebookName} />
        <MainGrid
          notes={notebookNotes}
          onEditNote={openEditNoteModal}
          onToggleFavorite={handleToggleFavorite}
          onTrashNote={handleTrashNote}
        />
      </main>
    </div>
  );
}
