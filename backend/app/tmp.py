import requests
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# ----------------------------
# 1. Cấu hình
# ----------------------------
url = "http://127.0.0.1:8001/predict"  # URL API
image_path = r"C:\Users\TUAN PC\Downloads\99100005.jpg"  # ảnh test

# Tham số JSON gửi kèm
params = {
    "threshold": 0.5,
    "class_weights": {
        "Crack": 3, "Marrow": 2, "Quartzity": 1, "resin": 1,
        "Dead_Knot": 1, "Live_Knot": 1, "Knot_missing": 2, "knot_with_crack": 2
    },
    "quality_thresholds": [2, 5, 10]
}

# ----------------------------
# 2. Gửi request
# ----------------------------
with open(image_path, "rb") as f:
    files = {"file": (image_path, f, "image/jpeg")}
    response = requests.post(url, files=files, json=params)

# Kiểm tra
if response.status_code != 200:
    print("Error:", response.status_code, response.text)
else:
    result = response.json()
    print("JSON output:", result)

# ----------------------------
# 3. Vẽ bounding box trực tiếp
# ----------------------------
# Load ảnh gốc
img = Image.open(image_path).convert("RGB")

# Vẽ bbox
fig, ax = plt.subplots(1, figsize=(12,12))
ax.imshow(img)

for det in result["detections"]:
    bbox = det["bbox"]  # [x1, y1, x2, y2]
    class_name = det["class_name"]
    conf = det["confidence"]
    
    x1, y1, x2, y2 = bbox
    width, height = x2 - x1, y2 - y1
    rect = patches.Rectangle((x1, y1), width, height, linewidth=2, edgecolor='r', facecolor='none')
    ax.add_patch(rect)
    ax.text(x1, y1-5, f"{class_name} {conf:.2f}", color='yellow', fontsize=12, weight='bold')

plt.axis("off")
plt.show()
