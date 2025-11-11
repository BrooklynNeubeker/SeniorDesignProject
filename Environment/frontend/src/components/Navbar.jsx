import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MapPin, Settings, User, MessageSquareMore } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  
  // let userRole;
  // if(authUser){
  //   userRole=authUser.role
  // }


  return (
    <header
      className="bg-base-100 borderb border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {/* left side*/}
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img
                  src="/logo3t.png" alt="a tent with a map in inside"
                ></img>
              </div>
              <h1 className="text-lg font-bold">AccessMap</h1>
              <h1>{authUser?.role}</h1>
            </Link>
          </div>

          {/* right side */}
          <div className="flex items-center gap-2">

            <Link to={'/chat'} className={`btn btn-sm gap-2 transition-colors`}>
              <MessageSquareMore className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </Link>
            <>
              {authUser && (
                <>

                  <Link 
                    to={authUser?.role === "Coordinator" ? "/" : "/vendor"}
                    className={`btn btn-sm gap-2 transition-colors`} >
                    <MapPin className="w-4 h-4" />
                    <span className="hidden sm:inline">My Events</span>
                  </Link>

                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </>
              )}
              <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              {authUser && (
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
