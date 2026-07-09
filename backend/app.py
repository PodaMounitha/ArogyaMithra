import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from utils.db import db, bcrypt

# Import models
from models.user import User
from models.medical_record import MedicalRecord
from models.access_permission import AccessPermission
from routes.auth import auth_bp
from routes.doctor import doctor_bp
from routes.patient import patient_bp
from routes.download import download_bp
from routes.access import access_bp
from routes.blockchain import blockchain_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)

app.config.from_object(Config)


CORS(app)

db.init_app(app)
bcrypt.init_app(app)
JWTManager(app)
app.register_blueprint(auth_bp, url_prefix="/api/auth")
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


@app.route("/")
def home():
    return {
        "message": "Arogya Mithra Backend Running",
        "status": "success"
    }

app.register_blueprint(
    doctor_bp,
    url_prefix="/api/doctor"
)

app.register_blueprint(
    patient_bp,
    url_prefix="/api/patient"
)
app.register_blueprint(
    download_bp,
    url_prefix="/api/download"
)

app.register_blueprint(
    access_bp,
    url_prefix="/api/access"
)

app.register_blueprint(
    blockchain_bp,
    url_prefix="/api/blockchain"
)

app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)