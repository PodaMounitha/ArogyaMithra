import hashlib


class HashingService:

    @staticmethod
    def hash_file(file_path):

        sha = hashlib.sha256()

        with open(file_path, "rb") as file:

            while True:

                chunk = file.read(4096)

                if not chunk:
                    break

                sha.update(chunk)

        return sha.hexdigest()