import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import api from "../services/api";

function VerifyRecord() {

    const { id } = useParams();

    const [record, setRecord] = useState(null);

    useEffect(()=>{

        verify();

    },[]);

    const verify = async()=>{

        try{

            const response = await api.get(

                "/patient/verify/"+id

            );

            setRecord(response.data);

        }

        catch(err){

            console.log(err);

        }

    }

    if(record==null){

        return <h1>Loading...</h1>

    }

    return(

        <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

            <Sidebar/>

            <div className="flex-1">

                <Navbar/>

                <div className="p-10">

                    <div className="bg-white rounded-3xl shadow-xl p-10">

                        <h1 className="text-3xl font-bold mb-8">

                            Blockchain Verification

                        </h1>

                        <div className="space-y-5 text-lg">

                            <p>

                                <b>Database Hash</b>

                            </p>

                            <p className="break-all">

                                {record.database_hash}

                            </p>

                            <p>

                                <b>Blockchain Hash</b>

                            </p>

                            <p className="break-all">

                                {record.blockchain_hash}

                            </p>

                            <p>

                                <b>Doctor Wallet</b>

                            </p>

                            <p>

                                {record.doctor_address}

                            </p>

                            <p>

                                <b>Timestamp</b>

                            </p>

                            <p>

                                {record.timestamp}

                            </p>

                            <div className="mt-8">

                                {

                                    record.verified ?

                                    <div className="bg-green-500 text-white p-4 rounded-xl">

                                        ✅ Record Verified Successfully

                                    </div>

                                    :

                                    <div className="bg-red-500 text-white p-4 rounded-xl">

                                        ❌ Record Has Been Tampered

                                    </div>

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default VerifyRecord;