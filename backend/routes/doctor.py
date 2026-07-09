import os

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from services.encryption_service import EncryptionService
from services.record_service import RecordService
from models.medical_record import MedicalRecord

doctor_bp = Blueprint("doctor", __name__)

@doctor_bp.route("/records/<int:doctor_id>")
@jwt_required()
def doctor_records(doctor_id):

    records = MedicalRecord.query.filter_by(
        doctor_id=doctor_id
    ).all()

    response = []

    for record in records:

        response.append({

            "record_id": record.id,

            "patient_id": record.patient_id,

            "file_name": record.file_name,

            "transaction_hash": record.transaction_hash

        })

    return jsonify(response)



UPLOAD_FOLDER = "uploads/encrypted_files"


@doctor_bp.route("/upload-record", methods=["POST"])
@jwt_required()
def upload_record():

    uploaded_file = request.files.get("file")

    patient_id = int(request.form["patient_id"])

    doctor_id = int(request.form["doctor_id"])

    if uploaded_file is None:
        return jsonify({
            "message": "No file selected"
        }), 400

    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    temp_path = os.path.join(
        UPLOAD_FOLDER,
        "temp_" + uploaded_file.filename
    )

    encrypted_path = os.path.join(
        UPLOAD_FOLDER,
        uploaded_file.filename + ".enc"
    )

    uploaded_file.save(temp_path)

    EncryptionService.encrypt_file(
        temp_path,
        encrypted_path
    )

    os.remove(temp_path)

    record = RecordService.save_record(
        patient_id,
        doctor_id,
        uploaded_file.filename,
        encrypted_path
    )

    return jsonify({

        "message": "Medical Record Uploaded",

        "record_id": record.id,

        "transaction_hash": record.transaction_hash,

        "sha256_hash": record.sha256_hash

    }), 201