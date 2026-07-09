import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UploadRecord() {

    const navigate = useNavigate();

    const [patientId, setPatientId] = useState("");

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const uploadRecord = async () => {

        if (!patientId || !file) {

            alert("Please select file and enter Patient ID.");

            return;

        }

        setLoading(true);

        const formData = new FormData();

        formData.append("patient_id", patientId);

        formData.append(
            "doctor_id",
            localStorage.getItem("userId")
        );

        formData.append(
            "file",
            file
        );

        try {

            const response = await api.post(

                "/doctor/upload-record",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert(

                "Record Uploaded Successfully\n\nTransaction Hash:\n\n"

                +

                response.data.transaction_hash

            );

            navigate("/dashboard");

        }

        catch (err) {

            console.log(err);

            alert("Upload Failed");

        }

        setLoading(false);

    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto">

                        <h1 className="text-3xl font-bold mb-8">

                            Upload Medical Record

                        </h1>

                        <div className="mb-6">

                            <label className="font-semibold">

                                Patient ID

                            </label>

                            <input

                                className="w-full mt-2 border rounded-xl p-3"

                                value={patientId}

                                onChange={(e)=>setPatientId(e.target.value)}

                            />

                        </div>

                        <div className="mb-8">

                            <label className="font-semibold">

                                Select Medical File

                            </label>

                            <input

                                type="file"

                                className="mt-3"

                                onChange={(e)=>setFile(e.target.files[0])}

                            />

                        </div>

                        <button

                            onClick={uploadRecord}

                            disabled={loading}

                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl"

                        >

                            {

                                loading

                                ?

                                "Uploading..."

                                :

                                "Upload Record"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UploadRecord;