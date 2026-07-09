from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.medical_record import MedicalRecord
from services.record_service import RecordService


patient_bp = Blueprint("patient", __name__)


@patient_bp.route("/verify/<int:record_id>", methods=["GET"])
@jwt_required()
def verify_record(record_id):

    result = RecordService.verify_record(record_id)

    if result is None:

        return jsonify({
            "message": "Record Not Found"
        }), 404

    return jsonify(result)




@patient_bp.route("/records/<int:patient_id>", methods=["GET"])
@jwt_required()
def get_records(patient_id):

    records = MedicalRecord.query.filter_by(
        patient_id=patient_id
    ).all()

    result = []

    for record in records:

        result.append({

            "record_id": record.id,

            "doctor_id": record.doctor_id,

            "file_name": record.file_name,

            "sha256_hash": record.sha256_hash,

            "transaction_hash": record.transaction_hash

        })

    return jsonify(result)