from utils.db import db, bcrypt
from models.user import User


class AuthService:

    @staticmethod
    def register(name, email, password, role):
        existing = User.query.filter_by(email=email).first()

        if existing:
            return {"error": "Email already exists"}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        user = User(
            name=name,
            email=email,
            password=hashed_password,
            role=role
        )

        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201

    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()

        if not user:
            return None

        if not bcrypt.check_password_hash(user.password, password):
            return None

        return user