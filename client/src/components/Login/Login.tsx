import React, { ChangeEvent, useEffect, useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { IUser } from "../../../typings/IUser";
import { useStateValue } from "../../context/StateProvider";
import { setUser } from "../../context/reducer";
import { getUser } from "../../api/resultAPI";

const Login = () => {
  const history = useHistory();
  const {
    dispatch,
    state: { user },
  } = useStateValue();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userLevel, setUserLevel] = useState(0);
  const [userScores, setUserScores] = useState(0);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const user: IUser = JSON.parse(userFromStorage);
      setUserName(user.username);
      setUserId(user.id);
      setUserLevel(user.level);
      setUserScores(user.scores);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const startGameHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await getUser(userName, userId);
    if (data && !data.error) {
      setUserName(data.user.username);
      setUserId(data.user._id);
      const user = {
        username: data.user.username,
        id: data.user._id,
        level: userLevel,
        scores: userScores,
      };
      dispatch(setUser(user));

      localStorage.setItem("user", JSON.stringify(user));
      history.push("/game");
    }
  };

  return (
    <div className="login">
      <form onSubmit={startGameHandler}>
        {user.id ? (
          <h3>Hello, {user.username}</h3>
        ) : (
          <>
            <h3>Login</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.trim())}
            />
          </>
        )}

        <button type="submit" disabled={!userName}>
          Start game
        </button>
      </form>
    </div>
  );
};

export default Login;
