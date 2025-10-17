import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="h-screen pt-20">
        <div className="w-full flex flex-1 flex-col items-center justify-left p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6 gap-2">

            <h1 className="text-2xl font-bold">My Events</h1>
            
            <div className="flex items-center gap-2">
                <button class="btn btn-neutral btn-outline">
                    <span>View Events</span>
                </button>

                <Link to={"/create"} className={`btn btn-neutral btn-outline`}>
                    <span>Create Event</span>
                </Link>
            </div>

            <p className="text-base-content/60">
            text
            </p>

            </div>
        </div>
    </div>
  );
}

export default HomePage;