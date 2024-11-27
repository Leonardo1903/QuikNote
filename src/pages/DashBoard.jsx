import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/authContext";
import { useToast } from "../hooks/use-toast";
import { dbService } from "../appwrite/db";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    Title: "",
    Content: "",
    Color: "#9333ea",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const notesContainerRef = useRef(null);

  const { logoutUser, user } = useAuth();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Success",
      description: "Logged out successfully",
      variant: "default",
    });
  };

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await dbService.getNotes(user.$id);
      setNotes(fetchedNotes);
      setMaxZIndex(Math.max(...fetchedNotes.map((note) => note.ZIndex), 0));
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch notes",
        variant: "destructive",
      });
    }
  };

  const handleCreateNote = async () => {
    if (newNote.Title && newNote.Content) {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      try {
        const createdNote = await dbService.createNote({
          ...newNote,
          UserID: user.$id,
          Position: JSON.stringify({
            x: Math.random() * 100,
            y: Math.random() * 100,
          }),
          ZIndex: newZIndex,
        });
        setNotes([...notes, createdNote]);
        setNewNote({ Title: "", Content: "", Color: "#9333ea" });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error creating note:", error);
        toast({
          title: "Error",
          description: "Failed to create note",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpdateNote = async (id, title, content, color) => {
    try {
      await dbService.updateNote(id, {
        Title: title,
        Content: content,
        Color: color,
      });
      setNotes(
        notes.map((note) =>
          note.$id === id
            ? { ...note, Title: title, Content: content, Color: color }
            : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await dbService.deleteNote(id);
      setNotes(notes.filter((note) => note.$id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const handleBringToFront = async (id) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    try {
      await dbService.updateNote(id, { ZIndex: newZIndex });
      setNotes(
        notes.map((note) =>
          note.$id === id ? { ...note, ZIndex: newZIndex } : note
        )
      );
    } catch (error) {
      console.error("Error updating note z-index:", error);
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const handleDragStart = (e) => {
    const { active } = e;
    setActiveId(active.id);
  };

  const handleDragEnd = async (e) => {
    const { active, delta } = e;
    const containerRect = notesContainerRef.current.getBoundingClientRect();
    try {
      const updatedNotes = notes.map((note) => {
        if (note.$id === active.id) {
          const currentPosition = JSON.parse(note.Position);
          const newPosition = {
            x: Math.min(
              Math.max(currentPosition.x + delta.x, 0),
              containerRect.width - 256
            ),
            y: Math.min(
              Math.max(currentPosition.y + delta.y, 0),
              containerRect.height - 200
            ),
          };
          dbService.updateNote(note.$id, {
            Position: JSON.stringify(newPosition),
          });
          return { ...note, Position: JSON.stringify(newPosition) };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note position:", error);
      toast({
        title: "Error",
        description: "Failed to update note position",
        variant: "destructive",
      });
    }
    setActiveId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-800 p-4 sm:p-6 md:p-8">
      <div className="mx-auto bg-white/10 backdrop-blur-md border border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-400">
            Welcome, {user.name}
          </h1>
          <Button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Logout
          </Button>
        </div>
        <Separator className="bg-gray-600 mb-6" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4 py-2 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800/80 transition-all duration-300 w-full sm:w-auto">
              <Plus className="mr-2" /> Create New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-gray-100 rounded-lg shadow-md">
            <DialogHeader>
              <DialogTitle className="text-purple-400 text-lg font-bold">
                Create a New Note
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newNote.Title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, Title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-gray-200 rounded-md mt-1"
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-gray-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={newNote.Content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, Content: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-gray-200 rounded-md mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="color" className="text-gray-300">
                  Color
                </Label>
                <Input
                  id="color"
                  type="color"
                  value={newNote.Color}
                  onChange={(e) =>
                    setNewNote({ ...newNote, Color: e.target.value })
                  }
                  className="w-12 h-10 p-1 bg-gray-800 border-gray-700 rounded-md mt-1"
                />
              </div>
              <Button
                onClick={handleCreateNote}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-all mt-4"
              >
                Create Note
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div
          ref={notesContainerRef}
          className="relative bg-gray-800/50 rounded-lg p-4 overflow-hidden"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {notes.map((note) => (
              <NoteCard
                key={note.$id}
                note={note}
                onDelete={handleDeleteNote}
                onBringToFront={handleBringToFront}
                onUpdate={handleUpdateNote}
                containerRef={notesContainerRef}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
}