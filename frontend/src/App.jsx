import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadRecord from "./pages/UploadRecord";
import PatientRecords from "./pages/PatientRecords";
import VerifyRecord from "./pages/VerifyRecord";
import AccessManagement from "./pages/AccessManagement";
import AuditLogs from "./pages/AuditLogs";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/upload"
                    element={<UploadRecord />}
                />

                <Route
                    path="/records"
                    element={<PatientRecords />}
                />

                <Route
                    path="/verify/:id"
                    element={<VerifyRecord />}
                />

                <Route
                    path="/access"
                    element={<AccessManagement />}
                />

                <Route
                    path="/audit"
                    element={<AuditLogs />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;