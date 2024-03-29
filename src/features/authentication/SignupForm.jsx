import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { signup, isLoading } = useSignUp();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nama lengkap" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Kolom ini perlu diisi" })}
        />
      </FormRow>

      <FormRow label="Alamat email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Kolom ini perlu diisi",
            pattern: "/S+@S+.S+/",
          })}
        />
      </FormRow>

      <FormRow
        label="Kata sandi (min 8 karakter)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Kolom ini perlu diisi",
            minLength: {
              value: 8,
              message: "Kata sandi minimal harus terdiri dari 8 karakter ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Ulangi kata sandi" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Kolom ini perlu diisi",
            validate: (value) =>
              value === getValues().password ||
              "Kata sandi yang anda masukkan tidak cocok ",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Batal
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Daftar pengguna baru"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
