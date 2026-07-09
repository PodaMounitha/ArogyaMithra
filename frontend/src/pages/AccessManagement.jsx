import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AccessManagement() {

    const [patientId, setPatientId] = useState("");

    const [doctorId, setDoctorId] = useState("");

    const [wallet, setWallet] = useState("");

    const grantAccess = async () => {

        try {

            const response = await api.post(
                "/access/grant",
                {
                    patient_id: patientId,
                    doctor_id: doctorId,
                    doctor_wallet: wallet
                }
            );

            alert(
                "Access Granted\n\nTransaction Hash:\n\n" +
                response.data.transaction_hash
            );

        }

        catch (err) {

            console.log(err);

            alert("Unable to Grant Access");

        }

    };

    const revokeAccess = async () => {

        try {

            const response = await api.post(
                "/access/revoke",
                {
                    patient_id: patientId,
                    doctor_id: doctorId,
                    doctor_wallet: wallet
                }
            );

            alert(
                "Access Revoked\n\nTransaction Hash:\n\n" +
                response.data.transaction_hash
            );

        }

        catch (err) {

            console.log(err);

            alert("Unable to Revoke Access");

        }

    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <div className="bg-white rounded-3xl shadow-xl max-w-3xl mx-auto p-10">

                        <h1 className="text-3xl font-bold mb-8">

                            Patient Consent Management

                        </h1>

                        <div className="space-y-6">

                            <div>

                                <label className="font-semibold">

                                    Patient ID

                                </label>

                                <input

                                    className="w-full border p-3 rounded-xl mt-2"

                                    value={patientId}

                                    onChange={(e)=>setPatientId(e.target.value)}

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Doctor ID

                                </label>

                                <input

                                    className="w-full border p-3 rounded-xl mt-2"

                                    value={doctorId}

                                    onChange={(e)=>setDoctorId(e.target.value)}

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Doctor Wallet Address

                                </label>

                                <input

                                    className="w-full border p-3 rounded-xl mt-2"

                                    value={wallet}

                                    onChange={(e)=>setWallet(e.target.value)}

                                />

                            </div>

                            <div className="flex gap-5 mt-6">

                                <button

                                    onClick={grantAccess}

                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"

                                >

                                    Grant Access

                                </button>

                                <button

                                    onClick={revokeAccess}

                                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl"

                                >

                                    Revoke Access

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AccessManagement;