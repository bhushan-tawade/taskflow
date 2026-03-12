import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful!");

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full left-[-200px] top-[-200px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full right-[-150px] bottom-[-150px]"></div>

      {/* Register Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[380px] bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >

        {/* Logo / Title */}
        <h1 className="text-3xl font-semibold text-white text-center mb-2 bricolage-grotesque text-yellow-300">
          Taskflow
        </h1>

        <p className="text-center text-white/50 text-sm mb-8">
          Create your account
        </p>

        {/* Name */}
        <div className="mb-4">

          <label className="text-white/70 text-sm">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

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
                      {showPassword ? <AiOutlineEyeInvisible size={26}/> : <AiOutlineEye size={26}/>}
                    </button>
        
                  </div>
        
                </div>

        {/* Register Button */}
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition duration-200 shadow-lg shadow-yellow-400/20"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-white/60 text-sm mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-yellow-400 ml-1 hover:text-yellow-300"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;