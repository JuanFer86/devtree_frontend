export type UserTypes = {
  name: string;
  email: string;
  handle: string;
  description: string;
  image: string;
  _id: string;
  links: string;
};

export type UserHandle = Omit<UserTypes, "_id">;

export type RegisterFormTypes = Pick<UserTypes, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginFormTypes = Pick<UserTypes, "email"> & {
  password: string;
};

export type ProfileForm = Pick<UserTypes, "handle" | "description">;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
