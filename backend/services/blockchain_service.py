import json
from pathlib import Path


from web3 import Web3
from web3.providers.eth_tester import EthereumTesterProvider


class BlockchainService:

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):

        self.web3 = Web3(EthereumTesterProvider())

        self.account = self.web3.eth.accounts[0]

        contract_path = (
            Path(__file__).resolve().parents[2]
            / "blockchain"
            / "compiled"
            / "compiled_contract.json"
        )

        with open(contract_path, "r", encoding="utf-8") as file:
            compiled = json.load(file)

        contract_data = compiled["contracts"]["MedicalRecord.sol"]["MedicalRecord"]

        abi = contract_data["abi"]
        bytecode = contract_data["evm"]["bytecode"]["object"]

        contract = self.web3.eth.contract(
            abi=abi,
            bytecode=bytecode
        )

        tx_hash = contract.constructor().transact(
            {"from": self.account}
        )

        receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)

        self.contract = self.web3.eth.contract(
            address=receipt.contractAddress,
            abi=abi
        )

    def add_record(self, blockchain_record_id, patient_id, record_hash):

        tx = self.contract.functions.addRecord(
            blockchain_record_id,
            patient_id,
            record_hash
        ).transact(
            {"from": self.account}
        )

        receipt = self.web3.eth.wait_for_transaction_receipt(tx)

        return receipt.transactionHash.hex()

    def get_record(self, record_id):

        return self.contract.functions.getRecord(
            record_id
        ).call()

    def grant_access(self, doctor):

        tx = self.contract.functions.grantAccess(
            doctor
        ).transact(
            {"from": self.account}
        )

        receipt = self.web3.eth.wait_for_transaction_receipt(tx)

        return receipt.transactionHash.hex()

    def revoke_access(self, doctor):

        tx = self.contract.functions.revokeAccess(
            doctor
        ).transact(
            {"from": self.account}
        )

        receipt = self.web3.eth.wait_for_transaction_receipt(tx)

        return receipt.transactionHash.hex()

    def has_access(self, patient, doctor):

        return self.contract.functions.hasAccess(
            patient,
            doctor
        ).call()
    

    def has_access(self, patient, doctor):

        return self.contract.functions.hasAccess(
            patient,
            doctor
        ).call()


    def get_record(self, record_id):

        return self.contract.functions.getRecord(
            record_id
        ).call()