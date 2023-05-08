import json
import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_DIR = BASE_DIR / ".secrets"
secrets = json.load(open(os.path.join(SECRET_DIR, 'secret.json')))