import { IUser } from "../../typings/IUser";
import IResults from "../../typings/IResults";

interface ServerResponse {
  error: boolean;
  user: {
    scores: number;
    username: string;
    _id: string;
  };
}
export const getUser = async (
  username: string,
  id?: string
): Promise<ServerResponse | undefined> => {
  try {
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, username }),
    });
    return await response.json();
  } catch (e) {}
};

export const setResult = async (
  result: number
): Promise<ServerResponse | undefined> => {
  try {
    const userFromStorage = localStorage.getItem("user");
    if (!userFromStorage) return;

    const { id, username }: IUser = JSON.parse(userFromStorage);
    const response = await fetch("/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, username, scores: result }),
    });
    return await response.json();
  } catch (e) {}
};

export const getResults = async (): Promise<IResults[] | undefined> => {
  try {
    const response = await fetch("/results");
    const data = await response.json();
    if (!data.error) {
      return data.results;
    }
  } catch (e) {}
};
