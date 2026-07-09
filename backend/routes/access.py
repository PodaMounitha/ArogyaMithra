from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from services.access_service import AccessService

access_bp = Blueprint(
    "access",
    __name__
)


@access_bp.route("/grant", methods=["POST"])
@jwt_required()
def grant():

    data = request.get_json()

    tx = AccessService.grant(
        patient_id=data["patient_id"],
        doctor_address=data["doctor_wallet"],
        doctor_id=data["doctor_id"]
    )

    return jsonify({
        "message": "Access Granted",
        "transaction_hash": tx
    })


@access_bp.route("/revoke", methods=["POST"])
@jwt_required()
def revoke():

    data = request.get_json()

    tx = AccessService.revoke(
        patient_id=data["patient_id"],
        doctor_address=data["doctor_wallet"],
        doctor_id=data["doctor_id"]
    )

    return jsonify({
        "message": "Access Revoked",
        "transaction_hash": tx
    })