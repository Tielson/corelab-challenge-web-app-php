import { api } from "../lib/api";
import { Note } from "../types/note";

export interface NoteFavorite {
  id: Note["id"],
  favorite: Note["favorite"]
}

export async function updateItemFavorite({ favorite, id }: NoteFavorite) {
  const response = await api.put(`/item-favorite/${id}`, { favorite });
  return response.data;
}