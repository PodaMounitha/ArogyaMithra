from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.medical_record import MedicalRecord
from models.user import User
from models.access_permission import AccessPermission

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/stats")
@jwt_required()
def dashboard_stats():

    total_records = MedicalRecord.query.count()

    total_patients = User.query.filter_by(role="patient").count()

    total_doctors = User.query.filter_by(role="doctor").count()

    access_granted = AccessPermission.query.filter_by(
        is_allowed=True
    ).count()

    return jsonify({

        "records": total_records,

        "patients": total_patients,

        "doctors": total_doctors,

        "access": access_granted

    })