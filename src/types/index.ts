export type UserTypes = {
  name: string;
  email: string;
  handle: string;
  description: string;
  image: string;
  _id: string;
};

export type RegisterFormTypes = Pick<UserTypes, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginFormTypes = Pick<UserTypes, "email"> & {
  password: string;
};

export type ProfileForm = Pick<UserTypes, "handle" | "description">;
