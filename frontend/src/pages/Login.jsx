import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DotGrid from "../utils/DotGrid";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

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

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden">

      <div className='w-full  h-full absolute z-0'>
        <DotGrid
          dotSize={4} gap={21}
          baseColor="#222222" activeColor="#fff07a"
          proximity={150} speedTrigger={100}
          shockRadius={250} shockStrength={5}
          maxSpeed={5000} resistance={750} returnDuration={1.5}
        />
      </div>


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

          <div className="flex p-3  items-center justify-between bg-[#2a2a2a] border border-white/10 text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full   outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" text-white/40 hover:text-white text-sm"
            >
              {showPassword ? <AiOutlineEyeInvisible size={26} /> : <AiOutlineEye size={26} />}
            </button>

          </div>

        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition duration-200 shadow-lg shadow-yellow-400/20 flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
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