from pymongo import MongoClient
from config import settings


mongo_client = settings.secrets["mongo_client"]
client = MongoClient(mongo_client)
db_name = settings.secrets["db_name"]
db = client[db_name]
