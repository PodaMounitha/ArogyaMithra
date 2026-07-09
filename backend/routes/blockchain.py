from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.medical_record import MedicalRecord

blockchain_bp = Blueprint(
    "blockchain",
    __name__
)


@blockchain_bp.route("/transactions")
@jwt_required()
def transactions():

    records = MedicalRecord.query.all()

    response = []

    for record in records:

        response.append({

            "record_id": record.id,

            "patient_id": record.patient_id,

            "doctor_id": record.doctor_id,

            "transaction_hash": record.transaction_hash,

            "sha256_hash": record.sha256_hash

        })

    return jsonify(response)