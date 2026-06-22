import json
import os
import sys

import pandas as pd
import requests
from flask import Flask, jsonify, render_template

# --- إعدادات التطبيق ---
INDEX_HTML_PATH = os.path.join('templates', 'index.html')
app = Flask(__name__)
inventory_df = None

# ==============================================================================
#  (1)  قراءة المنتجات من index.html (للتجربة بدون stock.pdf)
# ==============================================================================

def parse_products_from_index_html(file_path):
    """يستخرج allProducts من index.html ويحوّلها لنفس شكل بيانات المخزون."""
    if not os.path.exists(file_path):
        print(f"خطأ فادح: لم يتم العثور على الملف '{file_path}'.", file=sys.stderr)
        return None

    print(f"جاري قراءة المنتجات من '{file_path}'...")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        marker = 'const allProducts = ['
        start = -1
        pos = 0
        while True:
            found = content.find(marker, pos)
            if found == -1:
                break
            line_start = content.rfind('\n', 0, found) + 1
            if '//' not in content[line_start:found]:
                start = found
            pos = found + 1

        end_marker = '\nconst categoriesData'
        end = content.find(end_marker, start)
        if start == -1 or end == -1:
            print("خطأ: لم يتم العثور على allProducts داخل index.html.", file=sys.stderr)
            return None

        array_text = content[start + len('const allProducts = '):end].strip()
        if array_text.endswith(';'):
            array_text = array_text[:-1].strip()

        products = json.loads(array_text)
        if not products:
            print("خطأ: قائمة المنتجات فارغة.", file=sys.stderr)
            return None

        rows = []
        for product in products:
            rows.append({
                'Reference': str(product.get('id', '')),
                'Designation': product.get('name', ''),
                'Marque': '',
                'Quantite': 1,
                'Inventaire': 1,
                'Prix_Achat': 0,
                'Prix_Gros': 0,
                'Prix_Detail': product.get('price', 0),
                'Prix_Euro': 0,
                'Stock_Min': 0,
                'Rayonnage': '',
                'Code_Barre': product.get('id', 0),
            })

        df = pd.DataFrame(rows)
        print(f"تم تحميل {len(df)} منتج من index.html بنجاح.")
        return df

    except Exception as e:
        print(f"حدث خطأ أثناء قراءة index.html: {e}", file=sys.stderr)
        return None

# ==============================================================================
#  (2)  تعريف نقاط النهاية (Endpoints) لـ API - لا تغيير هنا
# ==============================================================================
@app.route('/')
def home():
    return "<h1>Inventory API</h1><p>Welcome! Use /api/stock to get all data.</p>"

@app.route('/api/stock', methods=['GET'])
def get_all_stock():
    if inventory_df is not None:
        result = inventory_df.to_dict(orient='records')
        return jsonify(result)
    else:
        return jsonify({"error": "Data not loaded or unavailable"}), 500

@app.route('/api/stock/<string:reference_code>', methods=['GET'])
def get_product_by_reference(reference_code):
    if inventory_df is not None:
        product = inventory_df[inventory_df['Reference'].str.strip() == reference_code.strip()]
        if not product.empty:
            return jsonify(product.iloc[0].to_dict())
        else:
            return jsonify({"error": "Product not found", "reference": reference_code}), 404
    else:
        return jsonify({"error": "Data not loaded or unavailable"}), 500

# ==============================================================================
#  (3)  لوحة التحكم (Admin Panel)
# ==============================================================================
REMOTE_API = 'https://test-zjdr.onrender.com'

@app.route('/admin')
def admin():
    """صفحة لوحة التحكم - تعرض الطلبات والعملاء."""
    orders = []
    customers = []
    try:
        orders_resp = requests.get(f'{REMOTE_API}/api/orders', timeout=10)
        if orders_resp.ok:
            orders = orders_resp.json()
    except Exception:
        pass
    try:
        customers_resp = requests.get(f'{REMOTE_API}/api/customers', timeout=10)
        if customers_resp.ok:
            customers = customers_resp.json()
    except Exception:
        pass
    return render_template('admin.html', orders=orders, customers=customers)

@app.route('/api/orders/<string:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """يمرر تحديث حالة الطلب إلى الـ API البعيد."""
    from flask import request
    try:
        resp = requests.put(
            f'{REMOTE_API}/api/orders/{order_id}/status',
            json=request.get_json(),
            timeout=10
        )
        return jsonify(resp.json()), resp.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==============================================================================
#  (4)  تشغيل الخادم
# ==============================================================================
if __name__ == '__main__':
    inventory_df = parse_products_from_index_html(INDEX_HTML_PATH)
    
    if inventory_df is not None:
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        print("فشل تحميل البيانات. لن يتم تشغيل الخادم.")
        sys.exit(1)