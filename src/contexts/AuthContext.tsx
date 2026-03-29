import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, email: string, password: string) => { success: boolean; error?: string };
  continueWithGoogle: (name?: string, email?: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,}$/;

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Must contain at least one lowercase letter";
  if (!/\d/.test(password)) return "Must contain at least one number";
  if (!/[@#$!%^&*]/.test(password)) return "Must contain at least one symbol (@#$!%^&*)";
  return null;
};

const getStoredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem("ai_study_pal_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const saveSession = (userData: User) => {
    localStorage.setItem("ai_study_pal_user", JSON.stringify(userData));
    setUser(userData);
  };

  useEffect(() => {
    const stored = localStorage.getItem("ai_study_pal_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const signup = (username: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const pwError = validatePassword(password);
    if (pwError) return { success: false, error: pwError };

    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: "Email already registered" };
    }

    users.push({ username, email: normalizedEmail, password });
    localStorage.setItem("ai_study_pal_users", JSON.stringify(users));

    const userData = { username, email: normalizedEmail };
    saveSession(userData);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password" };

    const userData = { username: found.username, email: found.email };
    saveSession(userData);
    return { success: true };
  };

  const continueWithGoogle = (name?: string, email?: string) => {
    const googleName = name || "Google User";
    const googleEmail = (email || "google.user@gmail.com").toLowerCase();
    const users = getStoredUsers();
    let found = users.find((u) => u.email.toLowerCase() === googleEmail);
    if (!found) {
      const newUser: StoredUser = { username: googleName, email: googleEmail, password: "Google@123" };
      users.push(newUser);
      localStorage.setItem("ai_study_pal_users", JSON.stringify(users));
      found = newUser;
    }
    saveSession({ username: found.username, email: found.email });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ai_study_pal_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, continueWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
