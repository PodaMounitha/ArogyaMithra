import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="bg-blue-700 text-white flex justify-between items-center px-8 py-4">

            <h1 className="text-2xl font-bold">

                🏥 Arogya Mithra

            </h1>

            <button

                onClick={logout}

                className="bg-red-500 px-4 py-2 rounded"

            >

                Logout

            </button>

        </div>

    );

}

export default Navbar;