from models.medical_record import MedicalRecord
from utils.db import db

from services.hashing_service import HashingService
from services.blockchain_service import BlockchainService


class RecordService:

    # Singleton Blockchain Service
    blockchain = BlockchainService()

    @staticmethod
    def save_record(patient_id, doctor_id, file_name, file_path):
        """
        Saves the medical record metadata in MySQL,
        stores the SHA-256 hash on the blockchain,
        and updates the transaction hash.
        """

        # Generate SHA-256 hash of the uploaded file
        file_hash = HashingService.hash_file(file_path)

        # Save record to MySQL first
        record = MedicalRecord(
            patient_id=patient_id,
            doctor_id=doctor_id,
            file_name=file_name,
            file_path=file_path,
            sha256_hash=file_hash
        )

        db.session.add(record)
        db.session.commit()

        # Store hash on blockchain using database record ID
        tx_hash = RecordService.blockchain.add_record(
            record.id,
            patient_id,
            file_hash
        )

        # Save blockchain transaction hash
        record.transaction_hash = tx_hash

        db.session.commit()

        return record

    @staticmethod
    def verify_record(record_id):
        """
        Compares the hash stored in MySQL
        with the hash stored on the blockchain.
        """

        record = MedicalRecord.query.get(record_id)

        if record is None:
            return None

        blockchain_record = RecordService.blockchain.get_record(record.id)
        print(blockchain_record)

        patient_id = blockchain_record[0]
        blockchain_hash = blockchain_record[1]
        doctor_address = blockchain_record[2]
        timestamp = blockchain_record[3]

        return {
            "record_id": record.id,
            "patient_id": patient_id,
            "doctor_address": doctor_address,
            "timestamp": timestamp,
            "database_hash": record.sha256_hash,
            "blockchain_hash": blockchain_hash,
            "verified": record.sha256_hash == blockchain_hash
        }

    @staticmethod
    def get_records_by_patient(patient_id):
        """
        Returns all medical records for a patient.
        """

        return MedicalRecord.query.filter_by(
            patient_id=patient_id
        ).all()