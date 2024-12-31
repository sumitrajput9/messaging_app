import {SchoolOutlined } from "@mui/icons-material";
import {  VscAccount, VscSignOut } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Services/ApiServices";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

export default function SidebarPage() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user")) || "";
    const handleLogOut =async (e) => {
        e.preventDefault();
        try {
            await logout(userData);

            localStorage.clear();
            navigate('/login')
            
        } catch (error) {
            console.error('Logout failed:', error);
            
        }
       
    }
    return (
        <div className="fixed top-0 left-0  flex h-[calc(100vh-3.5rem)] bg-[#E8F9F4] min-w-[220px] max-w-[250px] flex-col border-r-[1px] border-r-gray-700 bg-gray-800 py-10">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-center text-black">Accounts</h1>
              </div>
            <div className="flex flex-col">
                    <>
                        <NavLink
                            to="/home/user-profile"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 no-underline ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscAccount className="text-lg" />
                                <span>User</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/home/teacher"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 no-underline ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <GiTeacher className="text-lg" />
                                <span>Teacher</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/home/student"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 no-underline ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <PiStudent className="text-lg" />
                                <span>Student</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/home/institute"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 no-underline ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <SchoolOutlined className="text-lg" />
                                <span>Institute</span>
                            </div>
                        </NavLink>
                    </>
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700" />
            <div className="flex flex-col">
                <button
                    onClick={(e) => handleLogOut(e)}
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

