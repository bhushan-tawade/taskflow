import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert("Login failed");
      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full left-[-200px] top-[-200px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full right-[-150px] bottom-[-150px]"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[380px] bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >

        {/* Logo / Title */}
        <h1 className="text-3xl font-semibold text-white text-center mb-2 bricolage-grotesque text-yellow-300">
          Taskflow
        </h1>

        <p className="text-center text-white/50 text-sm mb-8">
          Login to continue
        </p>

        {/* Email */}
        <div className="mb-4">

          <label className="text-white/70 text-sm">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="text-white/70 text-sm">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Login Button */}
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition duration-200 shadow-lg shadow-yellow-400/20"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-white/60 text-sm mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-yellow-400 ml-1 hover:text-yellow-300"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Login;