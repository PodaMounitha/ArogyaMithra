import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "name",
                response.data.name
            );

            localStorage.setItem(
                "userId",
                response.data.id
            );

            navigate("/dashboard");

        }

        catch {

            alert("Invalid Credentials");

        }

    };

    return (

        <div className="flex justify-center items-center h-screen">

            <div className="border rounded-lg p-8 shadow-lg w-96">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Arogya Mithra
                </h1>

                <input

                    className="border p-2 w-full mb-4"

                    placeholder="Email"

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    type="password"

                    className="border p-2 w-full mb-4"

                    placeholder="Password"

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <button

                    onClick={login}

                    className="bg-blue-600 text-white p-2 w-full rounded"

                >

                    Login

                </button>

            </div>

        </div>

    );

}

export default Login;