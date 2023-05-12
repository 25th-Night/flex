from random import *
from time import time
import csv
import pandas as pd
from database import db, increase_id
from crawling import getMetaData



user_list = ["사용자", "구경꾼", "테스터", "관리자", "염탐꾼", "소유자"]
category_list = list(range(1,6))
product_list = {
    1: ["청바지", "셔츠", "코트", "가방", "신발"],
    2: ["맥북에어", "갤럭시북", "z플립", "로봇청소기", "냉장고"],
    3: ["한우", "삼겹살", "피자", "샐러드", "오렌지"],
    4: ["스킨", "로션", "립스틱", "썬크림", "마스크팩"],
    5: ["가구", "이불", "침대", "자동차", "아파트"],
}
price_list = list(range(10000, 10010000, 10000))
description_list = ["사고싶다", "갖고싶다", "희망1순위", "최애템", "제발"]

url = "https://shopping.naver.com/home"

def create_dummy_data():

    counts = int(input("추가할 데이터 수를 입력하세요. "))

    start = time()

    for _ in range(counts):

        user = choice(user_list)
        category = choice(category_list)
        name = choice(product_list[category])
        price = choice(price_list)
        description = choice(description_list)

        
        crawling_start = time()

        try:
            [title, desc, image_url] = getMetaData(url)
        except:
            image_url = 'https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893642__340.jpg'
        
        crawling_end = time()

        crawling_time = crawling_end - crawling_start
        print(f"크롤링에 소요된 시간은 {crawling_time}초")


        id = increase_id()

        product_info = {

            'id' : id,
            'user': user,
            'name': name,
            'category': category,
            'price': price,
            'url': url,
            'image_url': image_url,
            'description': description,
        }

        db.product.insert_one(product_info)
        print(f"{name}에 대한 위시리스트 등록 완료")
    end = time()
    print(f"데이터 {counts}개를 생성하는데 총 소요된 시간은 {end-start}초")


def create_csv_data():

    BASE_DIR = './static/csv/'

    file_name = 'products.csv'

    csv_path = BASE_DIR + file_name

    with open(csv_path, 'rt', encoding='cp949') as f:
        dr = csv.DictReader(f)
        products_list = pd.DataFrame(dr)

    for product in products_list.itertuples():

        id, user, name, category, price, url, description = increase_id(), product[1], product[2], product[3], product[4], product[5], product[6]

        try:
            [title, desc, image_url] = getMetaData(url)
        except:
            image_url = 'https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893642__340.jpg'

        product_info = {

            'id' : id,
            'user': user,
            'name': name,
            'category': category,
            'price': price,
            'url': url,
            'image_url': image_url,
            'description': description
        }

        db.product.insert_one(product_info)
        print(f"{id}번 데이터 생성 완료")
    print(f"총 {len(products_list)} 개의 데이터 생성 완료")

def check_db(table_name):
    if table_name not in db.list_collection_names():
        db.counter.insert_one({'collection' : table_name, 'id' : 0})
        print(f"{table_name} 테이블이 db에 존재하지 않습니다.")
    print(f"{table_name} 테이블 확인 완료")


def set_id_count(table_name):
    length = len(list(db[table_name].find({}, {'_id': False})))
    db.counter.update_one({'collection' : table_name}, {'$set':{'id': length}})
    print("수정 완료")

# dummy 데이터 생성
# create_dummy_data()

# csv 데이터 생성
create_csv_data()

table_name = "product"

# db에 테이블존재 여부 확인
# check_db(table_name)

# id_count 조정
# set_id_count(table_name)