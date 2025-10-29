import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// page and navbar imports
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SitePlanPage from "./pages/SitePlanPage";
import ChatPage from "./pages/ChatPage";
import CreateEventPage from "./pages/CreateEventPage";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgetPass from "./pages/ForgetPass";
import { ResetPass } from "./pages/ResetPass";
import EventDashboardPage from "./pages/EventDashboardPage";
import StallsPage from "./pages/StallsPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      {/*<Navbar/>*/}

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/event/:id/dashboard/site-plan"
          element={authUser ? <SitePlanPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/event/:id/dashboard"
          element={authUser ? <EventDashboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/event/create-event"
          element={authUser ? <CreateEventPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/event/:id/dashboard/stalls"
          element={authUser ? <StallsPage /> : <Navigate to="/login" />}
        />

        <Route path="/forget-password" element={<ForgetPass />}></Route>
        <Route path="/reset-password/:token" element={<ResetPass />}></Route>

        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
