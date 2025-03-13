import { api } from "../lib/api";
import { Note } from "../types/note";

export async function GetItemsAll() {
  const response = await api.get<Note[]>("/items");
  return response.data;
}
