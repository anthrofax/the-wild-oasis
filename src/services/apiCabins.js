import supabase from "./supabase.js";

export async function getCabin() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error('Gagal mengambil data cabin');
  }

  return data;
}
