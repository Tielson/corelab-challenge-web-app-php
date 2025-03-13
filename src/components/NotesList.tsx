import "../styles/NotesList.scss";
import { Note } from "../types/note";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes: Note[]
  onToggleFavorite: (id: string) => void
  onChangeNoteEdit: (
    id: string,
    title: Note["title"],
    content: Note["content"]
  ) => void
  onDeleteNote: (id: string) => void
  onChangeColor: (id: string, color: Note["color"]) => void
}

export function NotesList({
  notes,
  onToggleFavorite,
  onChangeNoteEdit,
  onDeleteNote,
  onChangeColor,
}: NotesListProps) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onToggleFavorite={onToggleFavorite}
          onChangeNoteEdit={onChangeNoteEdit}
          onDeleteNote={onDeleteNote}
          onChangeColor={onChangeColor}
        />
      ))}
    </div>
  );
};
