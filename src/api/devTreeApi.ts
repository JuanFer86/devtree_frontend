import { isAxiosError } from "axios";
import { api } from "../config/axios";
import { UserHandle, UserTypes } from "../types";

export const getUser = async () => {
  try {
    const { data } = await api<UserTypes>(`user`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // toast.warning(error.response?.data.error);
      throw new Error(error.response?.data.error);
    }
  }
};

export const updateProfile = async (formData: UserTypes) => {
  try {
    const { data } = await api.patch<string>(`user`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post(`user/image`, formData);
    return image;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // toast.warning(error.response?.data.error);
      throw new Error(error.response?.data.error);
    }
  }
};

export const getUserByHandle = async (handle: string) => {
  try {
    const { data } = await api<UserHandle>(`/` + handle);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // toast.warning(error.response?.data.error);
      throw new Error(error.response?.data.error);
    }
  }
};

export const searchByHandle = async (handle: string) => {
  try {
    const { data } = await api.post<{ msg: string }>(`/search`, { handle });
    return data.msg;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // toast.warning(error.response?.data.error);
      throw new Error(error.response?.data.error);
    }
  }
};
