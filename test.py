from pymongo import MongoClient
from config import settings


mongo_client = settings.secrets["mongo_client"]
client = MongoClient(mongo_client)
db_name = settings.secrets["db_name"]
db = client[db_name]

# products = list(db.product.find({}))

# print(products)

table_name = "product"

db.counter.insert_one({'collection' : table_name, 'id' : 0})