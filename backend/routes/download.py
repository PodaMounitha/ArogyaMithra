from flask import Blueprint, jsonify, send_file
from flask_jwt_extended import jwt_required

from models.medical_record import MedicalRecord

download_bp = Blueprint(
    "download",
    __name__
)


@download_bp.route("/record/<int:id>")
@jwt_required()
def download(id):

    record = MedicalRecord.query.get(id)

    if record is None:

        return jsonify({
            "message": "Record Not Found"
        }), 404

    return send_file(
        record.file_path,
        as_attachment=True
    )