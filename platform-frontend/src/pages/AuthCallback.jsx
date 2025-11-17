import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function sendCodeToBackend(code) {
  try {
    const response = await fetch(
      "https://cmbvknq8pi.execute-api.ap-northeast-2.amazonaws.com/dev/api/auth/github",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      }
    );
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
    let executed = false; // 중복 실행 방지

    const handleCallback = async () => {
      if (executed) return; // 이미 실행됐으면 종료
      executed = true;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const result = await sendCodeToBackend(code);

          if (result.success === true) {
            // localStrage에 할지 sessionStorage로 할지
            localStorage.setItem("token", result.accessToken);
            navigate("/dashboard");
          } else {
            console.error("로그인 실패");
            navigate("/");
          }
        } catch (error) {
          console.error("에러 확인됨", error);
          navigate("/");
        }
      }
    };

    handleCallback();
  }, []);

  return <section className="wrap">로그인 처리 중</section>;
};

export default AuthCallback;
