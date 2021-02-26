import { IUser } from "../../typings/IUser";

export const initialState = {
  user: {
    id: "",
    username: "",
    scores: 0,
    level: 0,
  },
};

export type State = typeof initialState;

export type Action =
  | { type: "SET_USER"; payload: IUser }
  | { type: "RESET_USER" }
  | { type: "SET_USER_LEVEL"; payload: number }
  | { type: "SET_USER_SCORES"; payload: number };

export const setUser = (payload: IUser) => ({
  type: "SET_USER" as const,
  payload,
});
export const resetUser = () => ({
  type: "RESET_USER" as const,
});
export const setUserLevel = (payload: number) => ({
  type: "SET_USER_LEVEL" as const,
  payload,
});
export const setUserScores = (payload: number) => ({
  type: "SET_USER_SCORES" as const,
  payload,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "RESET_USER":
      localStorage.clear();
      return {
        ...state,
        user: {
          id: "",
          username: "",
          level: 0,
          scores: 0,
        },
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_LEVEL":
      return {
        ...state,
        user: { ...state.user, level: action.payload },
      };
    case "SET_USER_SCORES":
      return {
        ...state,
        user: { ...state.user, scores: action.payload },
      };

    default:
      return state;
  }
};

export default reducer;
