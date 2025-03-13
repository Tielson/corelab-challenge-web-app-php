import { api } from "../lib/api";
import { Note } from "../types/note";

export async function createItem(note: Note) {
  console.log(note);
  const response = await api.post<Note>("/items", note);
  return response.data;
}