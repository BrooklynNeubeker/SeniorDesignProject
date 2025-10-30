import { LogOut, MapPin, MessageCircle, Settings, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const MenuNav = () => {
  const {logout, authUser} = useAuthStore();

  return (
    <div className="justify-items-end">
      <ul class="menu menu-horizontal rounded-box mt-8">
        <li>
          <a className="tooltip" data-tip="Chat" href="/chat">
            <MessageCircle/>
          </a>
        </li>
        <li>
          <a className="tooltip" data-tip="My Events" href="/">
            <MapPin/>
          </a>
        </li>
        <li>
          <a className="tooltip" data-tip="Profile" href="/profile">
            <UserRound/>
          </a>
        </li>
        <li>
          <a className="tooltip" data-tip="Settings" href="/settings">
            <Settings/>
          </a>
        </li>
         <li>
          <a className="tooltip" data-tip="Logout">
          {authUser && (
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut/>
                </button>
              )}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuNav;
