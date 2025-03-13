"use client";

import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateItem } from "../api/updateItem";
import "../styles/NoteUpdate.scss";
import { Note } from "../types/note";
import ColorPicker from "./ColorPicker";

interface NoteUpdateProps {
  note: Note;
  close: () => void;
}

const NoteUpdate = ({ note, close }: NoteUpdateProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [stars, setStars] = useState(note.favorite);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPicker, setColorPicker] = useState<Note["color"]>(note.color);

  const queryClient = useQueryClient();

  const { mutate: updatedFn, isPending } = useMutation({
    mutationFn: async (note: Note) => {
      await updateItem(note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      close();
      toast.success("Nota atualizada com sucesso", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar a nota", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setStars(note.favorite);
    setColorPicker(note.color);
  }, [note]);

  const toggleColorPicker = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color: Note["color"]) => {
    setShowColorPicker(false);
    setColorPicker(color);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("note.id", note.id);
    return updatedFn({
      id: note.id,
      title: title,
      content: content,
      color: colorPicker,
      favorite: stars,
    });
  };

  return (
    <div className="note-update">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="note-header">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-title"
          />
          <div className="note-actions">
            <button
              type="button"
              className={`star-button ${stars ? "active" : ""}`}
              onClick={() => setStars(!stars)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={stars ? "#ffa000" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            <div className="color-picker-container">
              <button
                className="action-button color-picker-button"
                onClick={toggleColorPicker}
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
                </svg>
              </button>
              {showColorPicker && <ColorPicker onSelectColor={handleColorChange} />}
            </div>
          </div>
        </div>
        <textarea
          placeholder="Criar nota..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-content"
        />
        <div className="note-footer">
          <Button type="submit" loading={isPending} className="update-button">
            Atualizar nota
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteUpdate;