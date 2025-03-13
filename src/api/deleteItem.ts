import { api } from "../lib/api";

export async function deleteItem(id: string) {
  const response = await api.delete(`/items/${id}`);
  return response.data;
}