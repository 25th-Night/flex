from pymongo import MongoClient
from config import settings


mongo_client = settings.secrets["mongo_client"]
client = MongoClient(mongo_client)
db_name = settings.secrets["db_name"]
db = client[db_name]

table_name = "product"

def check_db():
    if table_name not in db.list_collection_names():
        db.counter.insert_one({'collection' : table_name, 'id' : 0})
        print(f"{table_name} 테이블이 db에 존재하지 않습니다.")
    print(f"{table_name} 테이블 확인 완료")

def increase_id():
    id = db.counter.find_one({'collection' : table_name})['id'] + 1
    db.counter.update_one({'collection' : table_name}, {'$set':{'id': id}})
    return id