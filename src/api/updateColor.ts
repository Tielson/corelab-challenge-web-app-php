import { api } from "../lib/api";
import { Note } from "../types/note";

export interface NoteColor {
  id: Note["id"],
  color: Note["color"]
}

export async function updateItemColor({ color, id }: NoteColor) {
  const response = await api.put(`/item-color/${id}`, { color });
  return response.data;
}