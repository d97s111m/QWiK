import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const testUserAPI = async () => {
      const token = localStorage.getItem("token");
      console.log("저장된 토큰:", token);

      if (token) {
        try {
          const response = await fetch(
            "https://cmbvknq8pi.execute-api.ap-northeast-2.amazonaws.com/dev/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("User API 응답:", response.status);
          const userData = await response.json();
          console.log("사용자 데이터:", userData);
        } catch (error) {
          console.error("User API 에러:", error);
        }
      }
    };

    testUserAPI();
  }, []);

  return <section className="wrap">대시보드</section>;
};

export default Dashboard;
