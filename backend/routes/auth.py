from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    response, status = AuthService.register(
        data["name"],
        data["email"],
        data["password"],
        data["role"]
    )

    return jsonify(response), status


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = AuthService.login(
        data["email"],
        data["password"]
    )

    if not user:
        return jsonify({
            "message": "Invalid Credentials"
        }), 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "name": user.name
        }
    )

    return jsonify({

        "token": token,

        "id": user.id,

        "name": user.name,

        "role": user.role

    }), 200