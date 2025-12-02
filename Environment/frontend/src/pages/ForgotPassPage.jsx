import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateEmail();
        if (success === true) {
          axiosInstance.post("/auth/forgot-password", { email })
          try {
              toast.success("Password reset link sent to your email");
              navigate(`/profile`);
          }
          catch (error) {
              toast.error("Error sending password reset link");
          }
        }
    };

    const validateEmail = () => {
      if (!email.trim()) return toast.error("Please enter your email");
      if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");

      return true;
    };


  return (
    <div className="h-screen grid justify-center items-center">
      <div className="flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-4">

          <div className="mb-6 relative flex items-center justify-center">
            <Link to={`/coordinator`} className={`btn btn-soft`}> 
              Back to Login
            </Link>
          </div>

          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-base-content/60">Enter your email to reset your password.</p>
          {/* Form */}
          <div className="form-control flex flex-row justify-between space-y-2">
            <form onSubmit={handleSubmit}>
              <input
                  type="email"
                  className={`input input-bordered w-full`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                >
              </input>
            </form>

            <Link to={`/profile`} className={`btn btn-primary`} onClick={handleSubmit}> 
              Submit
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
