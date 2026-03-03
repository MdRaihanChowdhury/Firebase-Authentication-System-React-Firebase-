import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="home-page">
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <nav className="home-nav">
        <span className="nav-brand">AuthVault</span>
        <div className="nav-user">
          <span className="user-meta">{currentUser?.email}</span>
          <div className="user-avatar">
            {currentUser?.photoURL
              ? <img src={currentUser.photoURL} alt={displayName} referrerPolicy="no-referrer" />
              : initials
            }
          </div>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </nav>
      <div className="home-content">
        <div className="badge">
          <span className="badge-dot" />
          Authenticated Successfully
        </div>
        <h1 className="welcome-heading">
          Hello, <span className="gradient-text">{displayName}</span><br />
          You're in.
        </h1>
        <p className="welcome-sub">
          You've successfully signed in via Firebase Authentication.
          Your session persists across page refreshes automatically.
        </p>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-icon">🔐</div>
            <h3>Secure Session</h3>
          </div>
          <div className="info-card">
            <div className="info-card-icon">⚡</div>
            <h3>OAuth Ready</h3>
            <p>Google and GitHub OAuth are both configured. You can switch between providers anytime.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🛡️</div>
            <h3>Protected Routes</h3>
            <p>This page is only accessible to authenticated users. Others get redirected to login.</p>
          </div>
        </div>
      </div>
    </div>
  );
}