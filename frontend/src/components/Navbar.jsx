import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoFolderOpen } from "react-icons/io5";
import { TbChartPieFilled } from "react-icons/tb";

import { Link, useLocation } from "react-router-dom";


function Navbar({ logout }) {

    const location = useLocation();

    return (

        <div className="bg-[#FFF07A] h-[96vh] ml-4 mt-4 shadow px-4 py-6 flex flex-col justify-between items-center rounded-2xl">

            {/* APP NAME */}
            <div className="flex items-center gap-2 text-black">
                <FaUserCircle size={36} />

            </div>

            {/* USER SECTION */}


            <div className="flex flex-col items-center gap-4 text-black">
                {/* Dashboard btn */}
                <Link to="/dashboard">
                    <div
                        className={`p-3 rounded-2xl ${location.pathname === "/dashboard"
                            ? "bg-black text-[#FFF07A]"
                            : "text-black hover:bg-black/10"
                            }`}
                    >
                        <TbLayoutDashboardFilled size={26} />
                    </div>
                </Link>
                {/* tasks btn */}
                <Link to="/tasks">
                    <div
                        className={`p-3 rounded-2xl ${location.pathname === "/tasks"
                                ? "bg-black text-[#FFF07A]"
                                : "text-black hover:bg-black/10"
                            }`}
                    >
                        <IoFolderOpen size={26} />
                    </div>
                </Link>

                {/* Analytics btn */}
                <Link to="/analytics">
                    <div
                        className={`p-3 rounded-2xl ${location.pathname === "/analytics"
                                ? "bg-black text-[#FFF07A]"
                                : "text-black hover:bg-black/10"
                            }`}
                    >
                        <TbChartPieFilled size={26} />
                    </div>
                </Link>

            </div>

            <button
                onClick={logout}
                className="  py-1 rounded text-black hover:text-red-600 cursor-pointer transition ease-in"
            >
                <FiLogOut size={20} />
            </button>


        </div>

    );

}

export default Navbar;