from datetime import datetime
from utils.db import db


class MedicalRecord(db.Model):
    __tablename__ = "medical_records"

    id = db.Column(db.Integer, primary_key=True)

    patient_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    file_name = db.Column(db.String(255), nullable=False)

    file_path = db.Column(db.String(500), nullable=False)

    sha256_hash = db.Column(db.String(64), nullable=False)

    transaction_hash = db.Column(db.String(255))

    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    patient = db.relationship(
        "User",
        foreign_keys=[patient_id]
    )

    doctor = db.relationship(
        "User",
        foreign_keys=[doctor_id]
    )

    def __repr__(self):
        return f"<MedicalRecord {self.id}>"