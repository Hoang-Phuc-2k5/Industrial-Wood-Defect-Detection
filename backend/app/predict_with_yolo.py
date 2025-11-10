from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, List
from ultralytics import YOLO
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Load model YOLO
model = YOLO(r"C:\Users\TUAN PC\Downloads\best (4).pt")  # hoặc đường dẫn Linux trên Colab
classes = ["Crack","Marrow","Quartzity","resin","Dead_Knot","Live_Knot","Knot_missing","knot_with_crack"]

# Pydantic model để nhận JSON body
class PredictParams(BaseModel):
    threshold: float = 0.3  # threshold thấp hơn để detect tốt hơn
    class_weights: Dict[str, float] = {
        "Crack": 3, "Marrow": 2, "Quartzity": 1, "resin": 1,
        "Dead_Knot": 1, "Live_Knot": 1, "Knot_missing": 2, "knot_with_crack": 2
    }
    quality_thresholds: List[float] = [2, 5, 10]

# Hàm đánh giá chất lượng
def assess_quality(class_ids, class_weights, thresholds):
    score = sum([class_weights[classes[int(cid)]] for cid in class_ids])
    if score <= thresholds[0]:
        return "Rất tốt"
    elif score <= thresholds[1]:
        return "Tốt"
    elif score <= thresholds[2]:
        return "Trung bình"
    else:
        return "Rất tệ"

@app.post("/predict")
async def predict(file: UploadFile = File(...), params: PredictParams = None):
    # Load ảnh từ upload
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_np = np.array(img)  # PIL → numpy array để YOLO detect

    # Lấy params
    threshold = params.threshold if params else 0.3
    class_weights = params.class_weights if params else {
        "Crack": 3, "Marrow": 2, "Quartzity": 1, "resin": 1,
        "Dead_Knot": 1, "Live_Knot": 1, "Knot_missing": 2, "knot_with_crack": 2
    }
    quality_thresholds = params.quality_thresholds if params else [2,5,10]

    # Predict
    results = model.predict(img_np, conf=threshold)
    boxes = results[0].boxes

    # Debug: in mapping class thật của model
    # print("Model classes:", results[0].names)

    total_errors = len(boxes)
    class_ids = boxes.cls.tolist() if len(boxes) > 0 else []
    conf_scores = boxes.conf.tolist() if len(boxes) > 0 else []
    xyxy_coords = boxes.xyxy.tolist() if len(boxes) > 0 else []

    # Đếm số lỗi theo class
    class_counts = {cls_name: 0 for cls_name in classes}
    for cid in class_ids:
        class_counts[classes[int(cid)]] += 1

    # Phân loại chất lượng
    quality = assess_quality(class_ids, class_weights, quality_thresholds)

    # Chuẩn bị output YOLO chi tiết
    yolo_output = []
    for cid, conf, bbox in zip(class_ids, conf_scores, xyxy_coords):
        yolo_output.append({
            "class_id": int(cid),
            "class_name": classes[int(cid)],
            "confidence": float(conf),
            "bbox": [float(x) for x in bbox]  # [x1, y1, x2, y2]
        })

    return JSONResponse({
        "total_errors": total_errors,
        "class_counts": class_counts,
        "quality": quality,
        "detections": yolo_output
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "predict_with_yolo:app", 
        host="0.0.0.0",
        port=8001,
        reload=True
    )
