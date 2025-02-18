import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterFormTypes } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { api } from "../config/axios";

function Register() {
  const location = useLocation();

  const navigate = useNavigate();

  const initialValue: RegisterFormTypes = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const password = watch("password");

  const onSubmit = async (formData: RegisterFormTypes) => {
    try {
      const { data } = await api.post(`auth/register`, formData);

      toast.success(data.msg);
      reset();

      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.warning(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create Account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", { required: "Your name is mandatory" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Register Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "Your email is mandatory",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Username: without spaces"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", { required: "Your handle is mandatory" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="register Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Password is mandatory",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repeat Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat Password Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "Password is mandatory",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Create Account"
        />
      </form>

      <nav className="mt-10">
        <Link to="/auth/login" className="text-center text-white text-lg block">
          Have you already have an account?, Log in
        </Link>
      </nav>
    </>
  );
}

export default Register;
