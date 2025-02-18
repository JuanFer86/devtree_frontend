import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileForm, UserTypes } from "../types";
import { updateProfile, uploadImage } from "../api/devTreeApi";
import { toast } from "sonner";
import { ChangeEvent } from "react";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: UserTypes = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data?.handle,
      description: data?.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.setQueryData(["user"], (prevData: UserTypes) => {
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });

  const handleUserProfileForm = async (formData: ProfileForm) => {
    const user: UserTypes = queryClient.getQueryData(["user"]) as UserTypes;
    user.handle = formData.handle;
    user.description = formData.description;
    await updateProfileMutation.mutate(user);
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await uploadImageMutation.mutate(e.target.files[0]);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", { required: "Handle is mandatory" })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", { required: "description is mandatory" })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
