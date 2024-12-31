import { Route, Routes } from "react-router";
import { UserProfile } from "../Pages/UserProfile";
import SidebarPage from "./SidebarPage";
import { TeacherList } from "../Pages/TeacherList";
import { Institute } from "../Pages/Institute";
import { Studetns } from "../Pages/Students";

export function SidebarComponents() {
    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <SidebarPage />

                {/* Main Content Area */}
                <div className="flex-1 ml-[220px] overflow-y-auto"> 
        <Routes>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/teacher" element={<TeacherList />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/student" element={<Studetns />} />

        </Routes>
      </div>
            </div>
        </>
    )
}