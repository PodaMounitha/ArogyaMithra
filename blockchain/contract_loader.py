import json
from pathlib import Path

from solcx import compile_standard, install_solc

BASE_DIR = Path(__file__).parent
CONTRACT_PATH = BASE_DIR / "contracts" / "MedicalRecord.sol"
OUTPUT_DIR = BASE_DIR / "compiled"
OUTPUT_DIR.mkdir(exist_ok=True)

print("Installing Solidity compiler...")
install_solc("0.8.20")

with open(CONTRACT_PATH, "r", encoding="utf-8") as file:
    source = file.read()

compiled = compile_standard(
    {
        "language": "Solidity",
        "sources": {
            "MedicalRecord.sol": {
                "content": source
            }
        },
        "settings": {
            "outputSelection": {
                "*": {
                    "*": [
                        "abi",
                        "evm.bytecode"
                    ]
                }
            }
        }
    },
    solc_version="0.8.20"
)

output_file = OUTPUT_DIR / "compiled_contract.json"

with open(output_file, "w", encoding="utf-8") as file:
    json.dump(compiled, file, indent=4)

print("===================================")
print(" Smart Contract Compiled Successfully")
print(f" Output: {output_file}")
print("===================================")