from enum import Enum
from flask import Flask, render_template, request, jsonify
from database import db, check_db, increase_id

app = Flask(__name__)

class Category(Enum):
    fashion = 1
    electronic = 2
    food = 3
    cosmetic = 4
    etc = 5

@app.route('/')
def home():
    return render_template('index.html')


@app.route("/products", methods=["POST"])
def product_post():

    user = request.form['user_give']
    name = request.form['name_give']
    category = int(request.form['category_give'])
    price = int(request.form['price_give'])
    url = request.form['url_give']
    description = request.form['description_give']

    id = increase_id()

    product_info = {

        'id' : id,
        'user': user,
        'name': name,
        'category': category,
        'price': price,
        'url': url,
        'description': description
    }

    db.product.insert_one(product_info)

    return jsonify({'msg': '저장 완료!'})


@app.route("/products", methods=["GET"])
def products_get():

    category = request.args.get('category', 0)

    if category:
        products = list(db.product.find({'category': int(category)}, {'_id': False}))
    else:
        products = list(db.product.find({}, {'_id': False}))

    return jsonify({'products': products})


@app.route("/products/<id>", methods=["GET"])
def product_get(id):

    product_info = db.product.find_one({'id': int(id)}, {'_id': False})

    return jsonify({'product': product_info})


@app.route("/products/<id>", methods=["PUT"])
def product_modify(id):

    user = request.form['user_give']
    name = request.form['name_give']
    category = int(request.form['category_give'])
    price = int(request.form['price_give'])
    url = request.form['url_give']
    description = request.form['description_give']

    product_info = db.product.update_one({'id': int(id)}, {'$set':{
            'user': user,
            'name': name,
            'category': category,
            'price': price,
            'url': url,
            'description': description
            }
        }
    )

    return jsonify({'msg': '수정 완료!'})


@app.route("/products/<id>", methods=["DELETE"])
def product_remove(id):

    db.product.delete_one({'id': int(id)})

    return jsonify({'msg': '삭제 완료!'})




































if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
