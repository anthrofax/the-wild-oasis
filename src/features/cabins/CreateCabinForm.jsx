import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm({ dataToEdit = {}, onShowForm}) {
  const { id: editId, ...values } = dataToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? dataToEdit : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Data cabin berhasil ditambahkan");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Data cabin berhasil diperbarui");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      onShowForm();
    },
    onError: (err) => toast.error(err.message),
  });

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) editCabin({newCabin: { ...data, image }, id: data.id});
    else createCabin({ ...data, image });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isLoading}
          id="name"
          {...register("name", {
            required: "Kolom ini harus diisi",
          })}
        />
      </FormRow>

      <FormRow label="Maxinmum capacity" error={errors?.maxCapacity?.message}>
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

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
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

      <FormRow label="Discount" error={errors?.discount?.message}>
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
        label="Description for website"
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

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Anda perlu mengunggah foto cabin",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
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
