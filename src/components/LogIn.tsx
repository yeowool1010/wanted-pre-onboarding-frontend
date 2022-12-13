import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/user/login`,
        JSON.stringify({ userId, userPw }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { data: token, status } = response;
      if (status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setUserId("");
        setUserPw("");
        // setIsLogin(true);
        alert("로그인 성공");
        navigate("/");
      } else {
        alert("아이디 혹은 비밀번호를 다시 확인 해주세요 :)");
      }
    } catch (err) {
      console.error(e);
      alert("아이디 혹은 비밀번호를 다시 확인 해주세요 :)");
    }
  };

  return (
    <>
      <div className="logo"></div>
      <div className="login-box">
        <form onSubmit={onSubmit}>
          <div className="input-box">
            <p>ID</p>
            <input
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              className="input"
              type="text"
              placeholder="ID"
            ></input>
          </div>
          <div className="input-box">
            <p>Password</p>
            <input
              value={userPw}
              onChange={(e) => {
                setUserPw(e.target.value);
              }}
              className="input"
              type="password"
              placeholder="password"
            ></input>
          </div>
          <button className="login-btn">Log in</button>
        </form>
      </div>
      <div className="text">
        <p>{`Don't have an account?`}</p>
        <a href="/">Sign up</a>
      </div>
    </>
  );
};
