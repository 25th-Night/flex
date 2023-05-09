from pymongo import MongoClient
from time import time
from config import settings
from crawling import getMetaData
from time import time

mongo_client = settings.secrets["mongo_client"]
client = MongoClient(mongo_client)
db_name = settings.secrets["db_name"]
db = client[db_name]


# test >>>>>>>>>>>>>>>>>>>> counter table에 현재 프로젝트에서 사용하는 table에 대한 id 값이 저장되어 있는지 확인

# products = list(db.product.find({}))

# print(products)

# table_name = "product"

# db.counter.insert_one({'collection' : table_name, 'id' : 0})



# test >>>>>>>>>>>>>>>>>>>> 특정 객체에 대해 메타데이터 이미지 url 조회하는 코드

# data = db.product.find_one({'id':1}, {'_id': False})

# print(data)
# print(type(data))

# url = data['url']
# print(url)

# [title, desc, image] = getMetaData(url)  

# print(title)
# print(desc)
# print(image)


# test >>>>>>>>>>>>>>>>>>>> db에 저장된 데이터를 조회하여 반복문을 통해 크롤링 작업으로 image_url을 찾아서 데이터에 합치기

# db에 저장된 데이터 조회
products = list(db.product.find({}, {'_id': False}))

# 반복문을 통해 상품 정보를 하나씩 출력
for product in products:
    print(product)

print('----------------------')

# 시간 측정을 위해 크롤링 이전 시각 체크
start = time()

# 반복문을 돌며 크롤링 작업 진행
for product in products:
    url = product['url']
    try:
        [title, description, image_url] = getMetaData(url)
        product['image_url'] = image_url
    except:
        product['image_url'] = 'https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893642__340.jpg'

for product in products:
    print(product)

# 크롤링 완료 후 시각 체크
end = time()

# 소요 시간 확인
time_required = end - start
print(time_required)