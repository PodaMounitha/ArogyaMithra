from datetime import datetime
from utils.db import db


class AccessPermission(db.Model):
    __tablename__ = "access_permissions"

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

    is_allowed = db.Column(
        db.Boolean,
        default=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    patient = db.relationship(
        "User",
        foreign_keys=[patient_id]
    )

    doctor = db.relationship(
        "User",
        foreign_keys=[doctor_id]
    )