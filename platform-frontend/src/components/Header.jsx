import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   GitHub OAuth 전까지 테스트 용
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          QWIK
        </Link>

        {isLoggedIn ? (
          <>
            <nav className="nav">
              <Link to="/deploy">Deploy</Link>

              <Link to="/dashboard">Dashboard</Link>
              <Link to="/settings">MY</Link>
            </nav>
          </>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
