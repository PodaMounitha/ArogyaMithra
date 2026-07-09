from services.blockchain_service import BlockchainService

blockchain = BlockchainService()

tx = blockchain.add_record(
    1,
    "abcdef123456789"
)

print("Transaction Hash:")
print(tx)

record = blockchain.get_record(1)

print("\nRecord From Blockchain:")
print(record)