import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import useUserStore from "@zustand/store";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const { send } = useMutation("/users/login", { method: "POST" });
  const { setUserInfo } = useUserStore();

  const submitLogin = async () => {
    if (emailVal && passwordVal) {
      try {
        await send({
          body: JSON.stringify({
            email: emailVal,
            password: passwordVal,
          }),
        }).then((response) => {
          const userInfo = response.item;
          setUserInfo({
            username: userInfo.name,
            profileImage: userInfo.profileImage,
            _id: userInfo._id,
            isLoggedIn: true,
            accessToken: userInfo.token.accessToken,
          });
        });
        history.back();
      } catch (error) {
        alert(error.message);
      }
    } else {
      if (!emailVal) {
        alert("이메일을 입력해주세요.");
      } else if (!passwordVal) {
        alert("비밀번호를 입력해주세요.");
      }
    }
  };

  return (
    <main className="min-w-80 p-10 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form
          onSubmit={(event) => {
            submitLogin();
            event.preventDefault();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={emailVal}
              onChange={(e) => setEmailVal(e.target.value)}
              name="email"
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={passwordVal}
              onChange={(e) => setPasswordVal(e.target.value)}
              name="password"
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
