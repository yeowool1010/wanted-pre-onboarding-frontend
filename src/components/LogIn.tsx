import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const onChangePassword = useCallback((e: any) => {
    const passwordRegex = /^().{8,50}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("8자리 이상으로 입력 해 주세요");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  }, []);

  const onChangeEmailCheck = useCallback((e: any) => {
    const idRegex = /@/;

    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!idRegex.test(emailCurrent)) {
      setEmailMessage("메일 형식에 맞춰 작성 해 주세요!");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  const onLoginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data, status } = response;

      if (status === 200) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", email);
        setEmail("");
        setPassword("");
        alert("로그인 성공🎉");
        navigate("/todolist");
      }
    } catch (err) {
      console.error(err);
      alert("아이디 혹은 비밀번호를 다시 확인 해주세요 :)");
    }
  };

  return (
    <>
      <div className="logo"></div>
      <div className="login-box">
        <form onSubmit={onLoginSubmit}>
          <div className="">
            <p>E-mail</p>
            <input
              value={email}
              onChange={onChangeEmailCheck}
              className="input"
              type="text"
              placeholder="E-mail"
            ></input>
            {email.length > 0 && (
              <span className={`message ${isEmail ? "success" : "error"}`}>
                {emailMessage}
              </span>
            )}
          </div>
          <div className="input-box">
            <p>Password</p>
            <input
              value={password}
              onChange={onChangePassword}
              className="input"
              type="password"
              placeholder="password"
            ></input>
            {password.length > 0 && (
              <span className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </span>
            )}
          </div>
          <button className="login-btn">Log in</button>
        </form>
      </div>
      <div className="text">
        <p>{`Don't have an account?`}</p>
        <a href="/singup">Sign up</a>
      </div>
    </>
  );
};
