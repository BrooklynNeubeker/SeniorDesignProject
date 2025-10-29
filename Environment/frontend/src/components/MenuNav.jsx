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
          <a class="tooltip" data-tip="Chat">
            <Link
              to="/chat">
            <MessageCircle/>
            </Link>
          </a>
        </li>
        <li>
          <a class="tooltip" data-tip="My Events">
             <Link
              to="/">
            <MapPin/>
            </Link>
          </a>
        </li>
        <li>
          <a class="tooltip" data-tip="Profile">
             <Link
              to="/profile">
            <UserRound/>
            </Link>
          </a>
        </li>
        <li>
          <a className="tooltip" data-tip="Settings">
             <Link
              to="/settings">
            <Settings/>
            </Link>
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
