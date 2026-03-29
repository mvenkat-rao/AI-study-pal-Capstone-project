import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, validatePassword } from "@/contexts/AuthContext";
import { BookOpen, Eye, EyeOff, Mail, Lock, User, ChevronLeft } from "lucide-react";

const MOCK_GOOGLE_ACCOUNTS = [
  { name: "Venkat Mallapuram", email: "venkatmallapuram7@gmail.com", avatar: "VM" },
  { name: "Venkat Mallapuram", email: "venkatmallapuram339@gmail.com", avatar: "VM" },
  { name: "Venkatrao Mallapuram", email: "venkataraomallapuram339@gmail.com", avatar: "VR" },
];

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [selectedGoogleEmail, setSelectedGoogleEmail] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pwHint, setPwHint] = useState<string | null>(null);
  const { login, signup, continueWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!username.trim()) { setError("Username is required"); return; }
      const result = signup(username.trim(), email.trim(), password);
      if (result.success) navigate("/");
      else setError(result.error || "Signup failed");
    } else {
      const result = login(email.trim(), password);
      if (result.success) navigate("/");
      else setError(result.error || "Login failed");
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (isSignUp) setPwHint(validatePassword(val));
    else setPwHint(null);
  };

  const handleGoogleContinue = () => {
    setShowGooglePicker(true);
    setError("");
  };

  const handleGoogleAccountSelect = (email: string) => {
    setSelectedGoogleEmail(email);
  };

  const handleGoogleConfirm = () => {
    if (!selectedGoogleEmail) return;
    const account = MOCK_GOOGLE_ACCOUNTS.find((a) => a.email === selectedGoogleEmail);
    if (!account) return;
    const result = continueWithGoogle(account.name, account.email);
    if (result.success) navigate("/");
    else setError(result.error || "Google sign in failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-background/40 backdrop-blur-md" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-8">
          {showGooglePicker ? (
            /* Google Account Picker */
            <div>
              <button
                onClick={() => { setShowGooglePicker(false); setSelectedGoogleEmail(null); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <div className="text-center mb-6">
                <svg className="mx-auto h-8 mb-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <h2 className="font-heading text-lg font-semibold text-foreground">Choose an account</h2>
                <p className="text-xs text-muted-foreground mt-1">to continue to AI Study Pal</p>
              </div>
              <div className="space-y-2 mb-6">
                {MOCK_GOOGLE_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleGoogleAccountSelect(account.email)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                      selectedGoogleEmail === account.email
                        ? "border-primary bg-primary/5"
                        : "border-input bg-background hover:bg-muted"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {account.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{account.name}</div>
                      <div className="text-xs text-muted-foreground">{account.email}</div>
                    </div>
                  </button>
                ))}
              </div>
              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive mb-4">
                  {error}
                </div>
              )}
              <button
                onClick={handleGoogleConfirm}
                disabled={!selectedGoogleEmail}
                className="w-full rounded-lg gradient-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          ) : (
            /* Normal Login/Signup Form */
            <>
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary mb-4">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="font-heading text-2xl font-bold text-foreground">AI Study Pal</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {isSignUp ? "Create your account" : "Welcome back! Sign in to continue"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Enter password"
                      required
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {isSignUp && pwHint && (
                    <p className="text-xs text-destructive mt-1">{pwHint}</p>
                  )}
                  {isSignUp && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Min 8 chars: uppercase, lowercase, number, symbol (@#$!%^&*)
                    </p>
                  )}
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg gradient-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
              </div>

              {/* Continue with Google */}
              <button
                onClick={handleGoogleContinue}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-input bg-background py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              {/* Toggle */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => { setIsSignUp(!isSignUp); setError(""); setPwHint(null); }}
                  className="text-primary font-medium hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
