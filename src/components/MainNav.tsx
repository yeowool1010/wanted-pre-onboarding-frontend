import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * @author yeowool
 * @description localStorag의 token여부를 기준으로 MainNav의 상태를 관리한다.
 **/

export const MainNav = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const accessToken = localStorage?.getItem("token") || "";
  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else if (accessToken === "") {
      setIsLogin(false);
    }
  }, [accessToken]);

  return (
    <nav className="flex w-full h-11 p-5 text-red-700 bg-slate-500">
      {!isLogin ? (
        <div className="flex w-full h-full justify-around">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      ) : (
        <div className="">
          <Link to="/todolist">투두리스트</Link>
          <button className="">로그아웃</button>
        </div>
      )}
    </nav>
  );
};
