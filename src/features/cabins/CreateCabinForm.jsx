import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useUpdateCabin.js";

function CreateCabinForm({ dataToEdit = {}, onCloseModal }) {
  const { id: editId } = dataToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? dataToEdit : {},
  });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: data.id },
        {
          onSuccess: () => onCloseModal(),
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => onCloseModal(),
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : ""}
    >
      <FormRow label="Nama kamar" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isLoading}
          id="name"
          {...register("name", {
            required: "Kolom ini harus diisi",
          })}
        />
      </FormRow>

      <FormRow label="Kapasitas maksimum" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isLoading}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Kolom ini harus diisi",
            min: {
              value: 1,
              message: "Isi kolom minimal bernilai '1'",
            },
          })}
        />
      </FormRow>

      <FormRow label="Harga normal" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isLoading}
          id="regularPrice"
          {...register("regularPrice", {
            required: "Kolom ini harus diisi",
            min: {
              value: 1,
              message: "Isi kolom minimal bernilai '1'",
            },
          })}
        />
      </FormRow>

      <FormRow label="Diskon" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            required: "Kolom ini harus diisi",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Nilai discount tidak boleh lebih dari harga normal",
          })}
        />
      </FormRow>

      <FormRow
        label="Deskripsi kamar"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Kolom ini harus diisi",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Foto kamar" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession
              ? false
              : "Anda perlu mengunggah foto cabin",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit Cabin Data" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
