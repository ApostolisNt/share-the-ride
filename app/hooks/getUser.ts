import { User } from "data/schemas/users";

export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);

  if (!response.ok) {
    console.log("Failed to fetch user data");
  }

  const data = await response.json();
  return data.user;
};
