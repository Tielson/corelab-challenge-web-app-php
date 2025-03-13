"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { NoteColor, updateItemColor } from "../api/updateColor";
import color from "../assets/Ellipse1.png";
import edit from "../assets/Frame1.png";
import "../styles/NoteCard.scss";
import { Note } from "../types/note";
import ColorPicker from "./ColorPicker";
import NoteUpdate from "./NotesUpdate";

interface NoteCardProps {
  note: Note
  onToggleFavorite: (id: string) => void
  onChangeNoteEdit: (
    id: string,
    title: Note["title"],
    content: Note["content"]
  ) => void
  onDeleteNote: (id: string) => void
  onChangeColor: (id: string, color: Note["color"]) => void
}

const NoteCard = ({
  note,
  onToggleFavorite,
  onDeleteNote,
  onChangeColor,
}: NoteCardProps) => {
  const isLightBackground = ["white", "silver", "light-blue", "light-yellow", "light-green", "light-pink", "light-red", "light-lightblue", "light-purple", "light-lime", "light-orange", "light-gray", "light-darkgray", "light-brown"].includes(note.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();


  const { mutate: updatedFn } = useMutation({
    mutationFn: async (note: NoteColor) => {
      await updateItemColor(note);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar o favorito", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color: Note["color"]) => {
    onChangeColor(note.id!, color);
    updatedFn({ id: note.id!, color });
    setShowColorPicker(false);
  };



  const handleNoteEdit = () => {
    open();
  };

  return (
    <div className={`note-card note-${note.color}`}>
      <div className={`note-header ${isLightBackground ? "light-background" : "dark-background"}`}>
        <h3 className="note-title">{note.title}</h3>
        <button
          className={`star-button ${note.favorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(note.id!)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={note.favorite ? "#ffa000" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      </div>

      <div className="note-content">
        <p>{note.content}</p>
      </div>

      <Modal opened={opened} onClose={close} title="Atualizar Nota" centered>
        <NoteUpdate note={note} close={close} />
      </Modal>


      <div className="note-actions">
        <div className="action-buttons">
          <button
            className="action-button edit"
            onClick={() => handleNoteEdit()}
          >
            <img src={edit} alt="" />
          </button>
          <div className="color-picker-container">
            <button
              className="action-button color-picker-button"
              onClick={toggleColorPicker}
            >
              <img src={color} alt="" />
            </button>
            {showColorPicker && <ColorPicker onSelectColor={handleColorChange} />}
          </div>
        </div>
        <button
          className="action-button delete"
          onClick={() => onDeleteNote(note.id!)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
