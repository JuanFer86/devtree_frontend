import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/devTreeApi";
import { Link } from "react-router-dom";

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const handle = watch("handle");

  const mutation = useMutation({
    mutationFn: searchByHandle,
    mutationKey: ["handle"],
  });

  const handleSearchSubmit = () => {
    const slug = slugify(handle);
    mutation.mutate(slug);
  };

  console.log(mutation);
  return (
    <form onClick={handleSubmit(handleSearchSubmit)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "An username is required",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-5">
        {mutation.isPending && <p className="text-center">loading...</p>}
        {mutation.error && (
          <p className="text-center text-red-600 font-black">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-cyan-600 font-black">
            {mutation.data} go to{" "}
            <Link to="/auth/register" state={{ handle: slugify(handle) }}>
              Register
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Get my DevTree"
      />
    </form>
  );
};
