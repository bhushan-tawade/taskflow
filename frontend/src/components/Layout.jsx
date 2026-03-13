import Navbar from "./Navbar";

function Layout({ children }) {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="flex h-screen bg-[#FFF0E5] dark:bg-[#1E1E1E]  overflow-hidden">

            {/* Sidebar */}
            <Navbar logout={logout} />

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>

        </div>
    );
}

export default Layout;