"use client";

import { Box, Collapse } from "@mantine/core";
import "@mantine/core/styles.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteItem } from "../../api/deleteItem";
import { GetItemsAll } from "../../api/getItems";
import { NoteFavorite, updateItemFavorite } from "../../api/itemsFavorite";
import Header from "../../components/Header";
import NotesList from "../../components/NotesList";
import "../../styles/App.scss";
import { Note } from "../../types/note";



export function Home() {
  const [opened, setOpened] = useState<number | null>(null);
  const [filterText, setFilterText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const queryClient = useQueryClient();

  const { data: note } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      return await GetItemsAll();
    },
  });

  const { mutate: updatedFn } = useMutation({
    mutationFn: async (note: NoteFavorite) => {
      await updateItemFavorite(note);
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

  const { mutate: deleteFn } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      });
      toast.success("Nota deletada com sucesso", {
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
      toast.error("Erro ao deletar a nota", {
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



  const toggleFavorite = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
    updatedFn({
      id,
      favorite: !notes.find((note) => note.id === id)?.favorite
    });

  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    deleteFn(id);
  };

  const changeNoteColor = (id: string, color: Note["color"]) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, color } : note)));
  };

  const changeNoteEdit = (
    id: string,
    title: Note["title"],
    content: Note["content"]
  ) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, title, content } : note))
    );
  };

  const favoriteNotes = notes.filter((note) => note.favorite);
  const otherNotes = notes.filter((note) => !note.favorite);

  const toggle = (index: number) => {
    setOpened((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (note) {
      setNotes(
        note
          ?.map((note) => ({
            ...note,
            id: note.id,
          }))
          .reverse()
      );
    }
  }, [note]);

  return (
    <div className="app">
      <Header filterText={filterText} onFilterChange={setFilterText} />
      <main className="app-content">

        <section className="notes-section desktop favorite">
          <h2 className="section-title">Favoritos</h2>
          <NotesList
            notes={favoriteNotes.filter((note) =>
              note.title.toLowerCase().includes(filterText.toLowerCase()) ||
              note.content.toLowerCase().includes(filterText.toLowerCase()) ||
              note.color.toLowerCase().includes(filterText.toLowerCase())
            )}
            onToggleFavorite={toggleFavorite}
            onChangeNoteEdit={changeNoteEdit}
            onDeleteNote={deleteNote}
            onChangeColor={changeNoteColor}
          />
        </section>


        <section className="notes-section desktop others">
          <h2 className="section-title">Outras</h2>
          <NotesList
            notes={otherNotes.filter((note) =>
              note.title.toLowerCase().includes(filterText.toLowerCase()) ||
              note.content.toLowerCase().includes(filterText.toLowerCase()) ||
              note.color.toLowerCase().includes(filterText.toLowerCase())
            )}
            onToggleFavorite={toggleFavorite}
            onChangeNoteEdit={changeNoteEdit}
            onDeleteNote={deleteNote}
            onChangeColor={changeNoteColor}
          />
        </section>


        <Box maw={400} mx="auto">
          <section className="notes-section mobile">
            <h2 onClick={() => toggle(1)} className="section-title">Favoritos
              <span style={{ cursor: "pointer", marginLeft: "10px" }}>
                {opened === 1 ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
              </span></h2>
            <Collapse in={opened === 1} transitionDuration={500} transitionTimingFunction="linear">
              <NotesList
                notes={favoriteNotes.filter((note) =>
                  note.title.toLowerCase().includes(filterText.toLowerCase()) ||
                  note.content.toLowerCase().includes(filterText.toLowerCase())
                )}
                onToggleFavorite={toggleFavorite}
                onChangeNoteEdit={changeNoteEdit}
                onDeleteNote={deleteNote}
                onChangeColor={changeNoteColor}
              />
            </Collapse>
          </section>


          <section className="notes-section mobile">
            <h2 className="section-title" onClick={() => toggle(2)}>Outras <span style={{ cursor: "pointer", marginLeft: "10px" }}>
              {opened === 2 ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </span></h2>
            <Collapse in={opened === 2} transitionDuration={500} transitionTimingFunction="linear">
              <NotesList
                notes={otherNotes.filter((note) =>
                  note.title.toLowerCase().includes(filterText.toLowerCase()) ||
                  note.content.toLowerCase().includes(filterText.toLowerCase())
                )}
                onToggleFavorite={toggleFavorite}
                onChangeNoteEdit={changeNoteEdit}
                onDeleteNote={deleteNote}
                onChangeColor={changeNoteColor}
              />
            </Collapse>
          </section>
        </Box>


      </main>
    </div>
  );
}
