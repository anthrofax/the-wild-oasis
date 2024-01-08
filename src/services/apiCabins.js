import supabase from "./supabase.js";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Gagal mengambil data cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Gagal menghapus data cabin");
  }

  return data;
}
