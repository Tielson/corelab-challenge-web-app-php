import { api } from "../lib/api";
import { Note } from "../types/note";

export async function updateItem(note: Note) {
  const response = await api.put<Note>(`/items/${note.id}`, note);
  return response.data;
}