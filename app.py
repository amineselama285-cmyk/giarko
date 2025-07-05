import os
import json
import uuid
# --- تعديل: استيراد أدوات تجزئة كلمة المرور ---
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# --- إعداد التطبيق ---
app = Flask(__name__)
CORS(app)

# --- إعدادات تخزين البيانات ---
DATA_DIR = 'data'
CUSTOMERS_FILE = os.path.join(DATA_DIR, 'customers.json')
ORDERS_FILE = os.path.join(DATA_DIR, 'orders.json')

# التأكد من وجود مجلد البيانات
os.makedirs(DATA_DIR, exist_ok=True)

# --- دوال مساعدة لقراءة وكتابة ملفات JSON ---
def read_data(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def write_data(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# --- (جديد) نقاط نهاية المصادقة ---

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "اسم المستخدم وكلمة المرور مطلوبان"}), 400

    customers = read_data(CUSTOMERS_FILE)
    if any(c.get('username') == username for c in customers):
        return jsonify({"error": "اسم المستخدم هذا مسجل بالفعل"}), 409

    hashed_password = generate_password_hash(password)
    
    new_customer = {
        "id": str(uuid.uuid4()),
        "username": username,
        "password": hashed_password,
        "name": data.get('name'),
        "phone": data.get('phone'),
        "wilaya": data.get('wilaya'),
        "address": data.get('address'),
    }
    
    customers.append(new_customer)
    write_data(CUSTOMERS_FILE, customers)
    print(f"تم تسجيل عميل جديد: {username}")

    return jsonify({"message": "تم التسجيل بنجاح!"}), 201

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "اسم المستخدم وكلمة المرور مطلوبان"}), 400

    customers = read_data(CUSTOMERS_FILE)
    user = next((c for c in customers if c.get('username') == username), None)

    if not user or not check_password_hash(user.get('password', ''), password):
        return jsonify({"error": "اسم المستخدم أو كلمة المرور غير صحيحة"}), 401

    # لا نرسل كلمة المرور المجزئة إلى الواجهة الأمامية
    user_data_to_send = {key: value for key, value in user.items() if key != 'password'}

    print(f"تم تسجيل دخول المستخدم: {username}")
    return jsonify(user_data_to_send), 200

# --- نقاط نهاية الطلبات (معدلة) ---

@app.route('/api/orders', methods=['POST'])
def create_order():
    order_data = request.get_json()

    customer_id = order_data.get('customerId')
    if not customer_id:
        return jsonify({"error": "معرف العميل مطلوب لإنشاء طلب"}), 400
    
    # --- التعديل الرئيسي: التحقق فقط إذا لم يكن العميل "زائر" ---
    if customer_id != 'guest':
        customers = read_data(CUSTOMERS_FILE)
        customer = next((c for c in customers if c.get('id') == customer_id), None)
        if not customer:
            return jsonify({"error": "العميل المسجل غير موجود"}), 404
    # إذا كان العميل "guest"، يتم تجاوز التحقق والمتابعة

    orders = read_data(ORDERS_FILE)
    order_id = f"GYRKO-{abs(hash(str(order_data) + str(uuid.uuid4()))) % 1000000}"
    
    final_order = {
        "orderId": order_id,
        "customerId": customer_id,
        "customer": order_data['customer'],
        "items": order_data['items'],
        "totalAmount": order_data['totalAmount'],
        "orderDate": order_data['orderDate'],
        "status": "قيد التجهيز"
    }
    
    orders.insert(0, final_order)
    write_data(ORDERS_FILE, orders)
    print(f"تم استلام طلب جديد ({final_order['orderId']}) من العميل ID: {customer_id}")

    return jsonify({"message": "تم استلام الطلب بنجاح", "order": final_order}), 201

@app.route('/api/orders/<string:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    new_status = data.get('status')
    if not new_status:
        return jsonify({"error": "حالة الطلب الجديدة مطلوبة"}), 400
    orders = read_data(ORDERS_FILE)
    order_found = False
    for order in orders:
        if order.get('orderId') == order_id:
            order['status'] = new_status
            order_found = True
            break
    if not order_found:
        return jsonify({"error": "الطلب غير موجود"}), 404
    write_data(ORDERS_FILE, orders)
    print(f"تم تحديث حالة الطلب {order_id} إلى: {new_status}")
    return jsonify({"message": f"تم تحديث حالة الطلب {order_id} بنجاح", "status": new_status})

@app.route('/api/orders', methods=['GET'])
def get_orders():
    customer_id = request.args.get('customerId')
    orders = read_data(ORDERS_FILE)
    if customer_id:
        user_orders = [order for order in orders if order.get('customerId') == customer_id]
        return jsonify(user_orders)
    return jsonify(orders)

@app.route('/api/customers', methods=['GET'])
def get_customers():
    customers_raw = read_data(CUSTOMERS_FILE)
    customers_safe = [{k: v for k, v in c.items() if k != 'password'} for c in customers_raw]
    return jsonify(customers_safe)

# --- نقطة نهاية لوحة التحكم ---
@app.route('/admin')
def admin_panel():
    orders = read_data(ORDERS_FILE)
    customers_raw = read_data(CUSTOMERS_FILE)
    customers_safe = [{k: v for k, v in c.items() if k != 'password'} for c in customers_raw]
    return render_template('admin.html', orders=orders, customers=customers_safe)

# --- تشغيل التطبيق ---
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)