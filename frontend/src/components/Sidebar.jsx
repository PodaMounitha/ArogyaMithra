import { Link } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    return (

        <div className="w-64 bg-gray-100 h-screen p-6">

            <h2 className="font-bold text-xl mb-6">

                Dashboard

            </h2>

            <div className="flex flex-col gap-4">

                <Link to="/dashboard">

                    Home

                </Link>

                {

                    role==="doctor"

                    &&

                    <Link to="/upload">

                        Upload Record

                    </Link>

                }

                <Link to="/records">

                    Records

                </Link>

            </div>

        </div>

    );

}

export default Sidebar;