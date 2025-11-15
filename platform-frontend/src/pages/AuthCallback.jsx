import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function sendCodeToBackend(code) {
  try {
    const response = await fetch("백엔드 URL로 진입 시도", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("로그인 실패 사유:", error);
    throw error;
  }
}

const AuthCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      // code 확인용 콘솔 로그
      // 확인 후 삭제
      console.log(code);

      if (code) {
        try {
          const result = await sendCodeToBackend(code);
          if (result.success) {
            localStorage.setItem("token", result.accessToken);
            navigate("/dashboard");
          } else {
            console.error("로그인 실패");
            // 테스트를 위해 로그인 실패시에도 로그인 페이지로 돌아가지 않음
            // navigate("/login");
          }
        } catch (error) {
          console.error("에러 확인됨", error);
          //   navigate("/login");
        }
      }
    };
    handleCallback();
  }, []);
  return <section className="wrap">로그인 처리 중</section>;
};

export default AuthCallback;
