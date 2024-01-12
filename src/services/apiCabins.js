import supabase, { supabaseUrl } from "./supabase.js";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Gagal mengambil data cabin");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //1. Logic untuk menambahkan data ke cabins table
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2.  Logic untuk memperbarui data pada cabins table
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    if (!id) throw new Error("Gagal menambahkan data cabin");
    throw new Error("Gagal memperbarui data cabin");
  }

  if (hasImage) return data;

  // 3. Logic untuk mengupload gambar ke supabase bucket (hanya jika tidak terjadi error dan gambar belum pernah diunggah sama sekali sebelumnya)
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Gagal mengupload image ke supabase bucket, dan data cabin gagal ditambahkan."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Gagal menghapus data cabin");
  }

  return data;
}
