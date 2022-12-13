import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * @author yeowool
 * @description localStorag의 token여부를 기준으로 MainNav의 상태를 관리한다.
 * @description 로그아웃버튼으로 localStorag 에 담긴 모든 정보를 지운다.
 **/
export const MainNav = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const logOut = (e: any) => {
    localStorage!.removeItem("token");
    localStorage!.removeItem("user");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <nav className="flex w-full h-11 p-5 bg-slate-500">
      {!isLogin ? (
        <div className="flex w-full h-full justify-around">
          <Link to="/">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      ) : (
        <div className="flex">
          <p>To Do List</p>
          <button className="" onClick={logOut}>
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
};
