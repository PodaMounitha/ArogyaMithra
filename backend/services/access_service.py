from models.access_permission import AccessPermission
from utils.db import db
from services.blockchain_service import BlockchainService


class AccessService:

    blockchain = BlockchainService()

    @staticmethod
    def grant(patient_id, doctor_address, doctor_id):

        tx = AccessService.blockchain.grant_access(doctor_address)

        permission = AccessPermission.query.filter_by(
            patient_id=patient_id,
            doctor_id=doctor_id
        ).first()

        if permission is None:
            permission = AccessPermission(
                patient_id=patient_id,
                doctor_id=doctor_id,
                is_allowed=True
            )
            db.session.add(permission)
        else:
            permission.is_allowed = True

        db.session.commit()

        return tx

    @staticmethod
    def revoke(patient_id, doctor_address, doctor_id):

        tx = AccessService.blockchain.revoke_access(doctor_address)

        permission = AccessPermission.query.filter_by(
            patient_id=patient_id,
            doctor_id=doctor_id
        ).first()

        if permission:
            permission.is_allowed = False
            db.session.commit()

        return tx