import supabase from "./supabase.js";

export async function getGuest() {
  let { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Gagal mengambil data tamu");
  }

  return data;
}
