import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Gagal mengambil data cabin");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Logic untuk menambahkan data ke cabins table
  const { data: addedData, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Gagal menambahkan data cabin");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", addedData[0].id);

    console.log(storageError);
    throw new Error(
      "Gagal mengupload image ke supabase bucket, dan data cabin gagal ditambahkan."
    );
  }

  return addedData;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Gagal menghapus data cabin");
  }

  return data;
}
