# 🏥 ArogyaMithra – Blockchain-Based Electronic Health Record (EHR) System

ArogyaMithra is a secure Electronic Health Record (EHR) platform that enables patients and doctors to manage medical records with enhanced integrity, confidentiality, and access control. The system combines **Flask**, **React**, **MySQL**, **Docker**, and **Blockchain (Ethereum/Web3.py)** to provide tamper-resistant storage and role-based access management.

---

## 🚀 Features

### 👨‍⚕️ Doctor

* Secure authentication using JWT
* Upload encrypted medical records
* View uploaded medical records
* Verify record integrity using blockchain
* Blockchain transaction tracking

### 🧑‍💼 Patient

* Secure authentication using JWT
* View personal medical records
* Grant doctors access to records
* Revoke doctor access
* Verify blockchain integrity of records

### 🔐 Security Features

* AES encrypted medical records
* SHA-256 file hashing
* Blockchain-based tamper detection
* JWT Authentication
* Role-Based Access Control (RBAC)
* Secure file download

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Flask
* Flask-JWT-Extended
* Flask-Bcrypt
* SQLAlchemy
* PyMySQL

### Database

* MySQL 8

### Blockchain

* Solidity
* Web3.py
* Ethereum Tester Provider
* Smart Contracts

### DevOps

* Docker
* Docker Compose

---

## 📂 Project Structure

```
ArogyaMithra
│
├── backend
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── app.py
│   └── seed.py
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── blockchain
│   ├── contracts
│   ├── compiled
│   └── scripts
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/PodaMounitha/ArogyaMithra.git

cd ArogyaMithra
```

---

## 🐳 Run with Docker

Build and start the application:

```bash
docker compose up --build
```

The application will be available at:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

## 👤 Demo Accounts

The application automatically creates demo users during startup if they do not already exist.

### Doctor

```
Email:
doctor@gmail.com

Password:
password123
```

### Patient

```
Email:
patient@gmail.com

Password:
password123
```

---

## 🔗 Blockchain Verification

Every uploaded medical record is:

1. Encrypted using AES.
2. Hashed using SHA-256.
3. Stored in MySQL.
4. SHA-256 hash written to the blockchain.
5. Verified by comparing the blockchain hash with the database hash.

If both hashes match:

```
✅ Record Verified
```

Otherwise:

```
❌ Record Has Been Tampered
```

---

## 🔒 Role-Based Access Control

### Doctor Permissions

* Upload medical records
* View uploaded records
* Verify blockchain integrity

### Patient Permissions

* View personal records
* Grant doctor access
* Revoke doctor access

Access management is restricted to patients and enforced through JWT-based role validation.

---

## 📦 Docker Images

Backend

```
podamounitha/arogyamithra-backend
```

Frontend

```
podamounitha/arogyamithra-frontend
```

---

## 📸 Screenshots

You can include screenshots of:

* Login
* Doctor Dashboard
* Patient Dashboard
* Upload Record
* View Records
* Manage Access
* Blockchain Verification

---

## 🔮 Future Enhancements

* Hyperledger Fabric integration
* IPFS-based decentralized file storage
* MetaMask wallet authentication
* Multi-doctor permission management
* Audit trail dashboard
* Email notifications
* Cloud deployment (Render/AWS/Azure)

---

## 👨‍💻 Author

**Poda Mounitha**

GitHub:
https://github.com/PodaMounitha

---

## 📄 License

This project is developed for educational and portfolio purposes.
