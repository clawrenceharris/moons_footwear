import api from "./axios";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const response = await api.post(`/auth/login`, { email, password });
  return response.data;
};

export const logoutUser = async (email: string, password: string) => {
  const response = await api.post(`/auth/logout`, { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post(`/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};
