import base64
import hashlib
import os

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from dotenv import load_dotenv

load_dotenv()


class EncryptionService:

    SECRET = os.getenv("AES_SECRET_KEY")

    KEY = hashlib.sha256(
        SECRET.encode()
    ).digest()

    @staticmethod
    def encrypt_file(input_path, output_path):

        cipher = AES.new(
            EncryptionService.KEY,
            AES.MODE_EAX
        )

        with open(input_path, "rb") as file:
            plaintext = file.read()

        ciphertext, tag = cipher.encrypt_and_digest(
            plaintext
        )

        with open(output_path, "wb") as file:
            file.write(cipher.nonce)
            file.write(tag)
            file.write(ciphertext)

    @staticmethod
    def decrypt_file(input_path, output_path):

        with open(input_path, "rb") as file:

            nonce = file.read(16)

            tag = file.read(16)

            ciphertext = file.read()

        cipher = AES.new(
            EncryptionService.KEY,
            AES.MODE_EAX,
            nonce=nonce
        )

        plaintext = cipher.decrypt_and_verify(
            ciphertext,
            tag
        )

        with open(output_path, "wb") as file:
            file.write(plaintext)