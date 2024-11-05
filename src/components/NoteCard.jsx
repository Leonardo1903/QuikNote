import { useState, useEffect, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Trash2, Pen } from "lucide-react";

const getLuminance = (color) => {
  const rgb = color.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [r, g, b] = rgb.map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const isLightColor = (color) => {
  return getLuminance(color) > 0.5;
};

export default function NoteCard({ note, onDelete, onBringToFront, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.$id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(note.Title);
  const [localContent, setLocalContent] = useState(note.Content);
  const [localColor, setLocalColor] = useState(note.Color);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const contentRef = useRef(null);

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const position = JSON.parse(note.Position);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [localContent]);

  const handleSave = () => {
    onUpdate(note.$id, localTitle, localContent, localColor);
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const textColor = isLightColor(localColor) ? "text-black" : "text-white";

  return (
    <>
      <Card
        ref={setNodeRef}
        style={{
          ...style,
          position: "absolute",
          left: position.x,
          top: position.y,
          zIndex: note.ZIndex,
          backgroundColor: localColor,
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          minWidth: "256px",
          maxWidth: "400px",
          minHeight: "200px",
          maxHeight: "400px",
        }}
        className={`cursor-move ${textColor}`}
        onClick={() => onBringToFront(note.$id)}
        {...attributes}
        {...listeners}
      >
        <CardHeader className="p-4 border-b border-gray-700 flex justify-between items-start relative">
          <CardTitle
            className={`font-semibold text-lg tracking-wide ${textColor}`}
          >
            {note.Title}
          </CardTitle>
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
              className={`hover:bg-gray-800 p-1 rounded-full ${textColor} hover:text-white`}
            >
              <Pen className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.$id);
              }}
              className={`hover:bg-gray-800 p-1 rounded-full ${textColor} hover:text-red-500`}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 max-h-64 overflow-auto">
          <p className={`text-sm whitespace-pre-wrap ${textColor}`}>
            {note.Content}
          </p>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-400 text-xl font-semibold">
              Edit Note
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-gray-300">
                Content
              </Label>
              <Textarea
                id="content"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100 resize-vertical overflow-hidden"
                rows={4}
                ref={contentRef}
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-gray-300">
                Color
              </Label>
              <Input
                id="color"
                type="color"
                value={localColor}
                onChange={(e) => setLocalColor(e.target.value)}
                className="h-10 p-1 bg-gray-700 border-gray-600 rounded"
              />
            </div>
            <Button
              onClick={handleSave}
              className="w-full bg-purple-600 hover:bg-purple-700 mt-4 py-2 text-white font-semibold rounded"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
