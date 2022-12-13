import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_URL;

export const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

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

  const onChangePassword = useCallback((e: any) => {
    const passwordRegex = /^().{8,50}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("8자리 이상으로 입력 해 주세요");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  const onChangePasswordConfirm = useCallback(
    (e: any) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  const onSignUpSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "/auth/signup",
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

      setEmail("");
      setPassword("");
      alert(`회원가입에 성공 했습니다! 환영합니다 :)`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("이미 있는 이메일 입니다. 다른 이메일로 가입 해 주세요 :) ");
    }
  };

  return (
    <>
      <div className="signup-box">
        <form onSubmit={onSignUpSubmit}>
          <div className="">
            <p>E-mail</p>
            <input
              value={email}
              onChange={onChangeEmailCheck}
              className="input"
              type="text"
              placeholder="ID"
            ></input>
            {email.length > 0 && (
              <span className={`message ${isEmail ? "success" : "error"}`}>
                {emailMessage}
              </span>
            )}
          </div>
          <div className="input-box formbox">
            <p>Password</p>
            <input
              value={password}
              onChange={onChangePassword}
              className="input"
              type="password"
              placeholder="Password"
            ></input>
            {password.length > 0 && (
              <span className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </span>
            )}
          </div>
          <div className="input-box formbox">
            <p>Password Check</p>
            <input
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              className="input"
              type="password"
              placeholder="Password"
            ></input>
            {passwordConfirm.length > 0 && (
              <span
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>

          <button
            className="signup-btn"
            type="submit"
            disabled={!(isEmail && isPassword && isPasswordConfirm)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};
