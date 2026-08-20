import { useForm } from "@tanstack/react-form";
import { INITIAL_REGISTER_FORM } from "./constants";

export function useRegisterForm() {
  return useForm({
    defaultValues: INITIAL_REGISTER_FORM,
  });
}

export type RegisterFormApi = ReturnType<typeof useRegisterForm>;
