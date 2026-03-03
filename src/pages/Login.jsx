import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(""); setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
    setLoading(false);
  }

  async function handleGoogle() {
    try { setError(""); await signInWithPopup(auth, googleProvider); navigate("/"); }
    catch (err) { setError(err.message.replace("Firebase: ", "")); }
  }

    async function handleGithub() {
    try {
        setError("");
        await signInWithPopup(auth, githubProvider);
        navigate("/");
    } catch (err) {
        // This error means the email is already used with Google/Email
        if (err.code === "auth/account-exists-with-different-credential") {
        setError(
            "This email is already registered with Google. Please sign in with Google instead."
        );
        } else {
        setError(err.message.replace("Firebase: ", ""));
        }
    }
    }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="auth-card">
        <div className="auth-card-header">
          <div className="logo-mark">
            <svg viewBox="0 0 40 40" fill="none" width="52" height="52">
              <circle cx="20" cy="20" r="18" stroke="url(#lg)" strokeWidth="2"/>
              <path d="M12 20 L20 12 L28 20 L20 28 Z" fill="url(#lg)" opacity="0.85"/>
              <circle cx="20" cy="20" r="4" fill="url(#lg)"/>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your journey</p>
        </div>
        {error && (
          <div className="auth-error">
            <span className="auth-error-icon">!</span>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={e => setEmail(e.target.value)} required className="auth-input" />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input type="password" placeholder="Your password" value={password}
              onChange={e => setPassword(e.target.value)} required className="auth-input" />
          </div>
          <button type="submit" disabled={loading} className="auth-btn primary-btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="divider"><span>or continue with</span></div>
        <div className="social-btns">
          <button onClick={handleGoogle} className="auth-btn social-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button onClick={handleGithub} className="auth-btn social-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
        <p className="auth-switch">No account yet? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}