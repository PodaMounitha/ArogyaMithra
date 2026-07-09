import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AuditLogs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const response = await api.get(
                "/blockchain/transactions"
            );

            setLogs(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h1 className="text-3xl font-bold mb-8">

                            Blockchain Audit Logs

                        </h1>

                        <table className="w-full">

                            <thead>

                                <tr className="bg-cyan-600 text-white">

                                    <th className="p-4">

                                        Record

                                    </th>

                                    <th>

                                        Patient

                                    </th>

                                    <th>

                                        Doctor

                                    </th>

                                    <th>

                                        Transaction Hash

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    logs.map((log)=>(

                                        <tr

                                            key={log.record_id}

                                            className="border-b"

                                        >

                                            <td className="p-4">

                                                {log.record_id}

                                            </td>

                                            <td>

                                                {log.patient_id}

                                            </td>

                                            <td>

                                                {log.doctor_id}

                                            </td>

                                            <td className="text-blue-700">

                                                {log.transaction_hash}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AuditLogs;