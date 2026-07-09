import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function PatientRecords() {

    const navigate = useNavigate();

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRecords();

    }, []);

    const loadRecords = async () => {

        try {

            const response = await api.get(
                "/patient/records/" +
                localStorage.getItem("userId")
            );

            setRecords(response.data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load records.");

        }

        setLoading(false);

    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h1 className="text-3xl font-bold mb-8">

                            My Medical Records

                        </h1>

                        {

                            loading ?

                            <h2>Loading...</h2>

                            :

                            records.length===0 ?

                            <h2>No Records Found.</h2>

                            :

                            <table className="w-full border-collapse">

                                <thead>

                                    <tr className="bg-cyan-600 text-white">

                                        <th className="p-4">

                                            Record ID

                                        </th>

                                        <th>

                                            Doctor

                                        </th>

                                        <th>

                                            File

                                        </th>

                                        <th>

                                            Blockchain

                                        </th>

                                        <th>

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        records.map((record)=>(

                                            <tr

                                                key={record.record_id}

                                                className="border-b hover:bg-cyan-50"

                                            >

                                                <td className="p-4">

                                                    {record.record_id}

                                                </td>

                                                <td>

                                                    {record.doctor_id}

                                                </td>

                                                <td>

                                                    {record.file_name}

                                                </td>

                                                <td className="text-green-600 font-bold">

                                                    Verified

                                                </td>

                                                <td>

                                                    <button

                                                        onClick={()=>navigate(

                                                            "/verify/"+

                                                            record.record_id

                                                        )}

                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                                                    >

                                                        Verify

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PatientRecords;