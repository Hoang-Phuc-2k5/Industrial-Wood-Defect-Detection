import base64
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import numpy as np
import cv2
import requests
import json



FASTAPI_URL = "http://127.0.0.1:8001/predict"

def draw_bboxes_on_image(image_bytes, detections):
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    for det in detections:
        x1, y1, x2, y2 = map(int, det["bbox"])
        class_name = det.get("class_name", "N/A")
        confidence = det.get("confidence", 0)

        y_text = max(y1-5, 10)
        cv2.rectangle(image, (x1, y1), (x2, y2), color=(0,0,255), thickness=2)
        cv2.putText(image, f"{class_name} {confidence:.2f}", (x1, y_text),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,255), 1, cv2.LINE_AA)

    _, img_encoded = cv2.imencode(".jpg", image)
    return img_encoded.tobytes()
# app/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import base64, requests, json, numpy as np, cv2
from .models import ImageAnalysis

FASTAPI_URL = "http://127.0.0.1:8001/predict"

@csrf_exempt
def receive_image(request):
    if request.method == "POST" and request.FILES.get("image"):
        uploaded_file = request.FILES["image"]
        file_bytes = uploaded_file.read()

        threshold_str = request.POST.get("threshold", "0.5")
        try:
            threshold = float(threshold_str)
        except ValueError:
            threshold = 0.5

        # Parse optional params
        try:
            class_weights = json.loads(request.POST.get("class_weights", "{}"))
            quality_thresholds = json.loads(request.POST.get("quality_thresholds", "[]"))
        except:
            class_weights, quality_thresholds = None, None

        files = {"file": (uploaded_file.name, file_bytes, uploaded_file.content_type)}
        payload = {"threshold": threshold}
        if class_weights: payload["class_weights"] = class_weights
        if quality_thresholds: payload["quality_thresholds"] = quality_thresholds

        # Gọi API YOLO
        try:
            response = requests.post(FASTAPI_URL, files=files, json=payload, timeout=120)
            response.raise_for_status()
            result = response.json()
        except Exception as e:
            return JsonResponse({"error": f"API call failed: {str(e)}"}, status=500)

        # Vẽ bbox và encode base64
        detections = result.get("detections", [])
        image_with_bbox = draw_bboxes_on_image(file_bytes, detections)
        img_base64 = base64.b64encode(image_with_bbox).decode("utf-8")

        # Lưu vào SQLite
        ImageAnalysis.objects.create(
            image_name=uploaded_file.name,
            total_errors=result.get("total_errors", 0),
            class_counts=result.get("class_counts", {}),
            quality=result.get("quality", "N/A"),
            threshold=threshold
        )

        data = {
            "image": img_base64,
            "total_errors": result.get("total_errors"),
            "class_counts": result.get("class_counts"),
            "quality": result.get("quality"),
            "threshold": threshold
        }
        return JsonResponse(data)

    return JsonResponse({"error": "Invalid request"}, status=400)




from django.db.models import Sum
from django.http import JsonResponse
from .models import ImageAnalysis

def get_statistics(request):
    qs = ImageAnalysis.objects.all()
    total_images = qs.count()
    total_errors_sum = qs.aggregate(total_errors_sum=Sum('total_errors'))['total_errors_sum'] or 0

    # Tổng lỗi theo class
    class_counts_total = {}
    for obj in qs:
        for cls, count in obj.class_counts.items():
            class_counts_total[cls] = class_counts_total.get(cls, 0) + count

    # Số ảnh theo chất lượng
    quality_counts = {}
    for obj in qs:
        q = obj.quality
        quality_counts[q] = quality_counts.get(q, 0) + 1

    return JsonResponse({
        "total_images": total_images,
        "total_errors": total_errors_sum,
        "class_counts_total": class_counts_total,
        "quality_counts": quality_counts
    })
