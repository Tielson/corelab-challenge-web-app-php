"use client";

import type React from "react";

import { Button } from "@mantine/core";
import { useState } from "react";
import "../styles/NoteCreator.scss";
import { Note } from "../types/note";
import { ColorPicker } from "./ColorPicker";

interface NoteCreatorProps {
  onAddNote: (note: Note) => void
  isPending: boolean
}

export function NoteCreator({ onAddNote, isPending }: NoteCreatorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPicker, setColorPicker] = useState<Note["color"]>("white");

  const toggleColorPicker = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color: Note["color"]) => {
    setShowColorPicker(false);
    setColorPicker(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddNote({
      title,
      content:
        content ||
        "Clique ou arraste o arquivo para esta área para fazer upload",
      color: colorPicker,
      favorite: stars,
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="note-creator">
      <form onSubmit={handleSubmit}>
        <div className="note-header">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-title"
          />
          <div className="note-actions">
            <button type="button"
              className={`star-button ${stars ? true : false}`}
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
      </form>
      <div className="note-footer">
        <Button variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }} type="submit" onClick={handleSubmit} loading={isPending}>
          Criar nota
        </Button>
      </div>
    </div>
  );
};
