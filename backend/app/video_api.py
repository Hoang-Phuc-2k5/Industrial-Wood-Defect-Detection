
from fastapi import FastAPI, WebSocket
from ultralytics import YOLO
from PIL import Image
import io, base64
import numpy as np
import json

app = FastAPI()
model = YOLO(r"C:\Users\TUAN PC\Downloads\best (4).pt")
classes = ["Crack","Marrow","Quartzity","resin","Dead_Knot","Live_Knot","Knot_missing","knot_with_crack"]

@app.websocket("/ws_detect")
async def ws_detect(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            img_data = payload["image"].split(",")[1]  # remove data:image/jpeg;base64,
            img_bytes = base64.b64decode(img_data)
            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
            img_np = np.array(img)

            results = model.predict(img_np, conf=0.3)
            boxes = results[0].boxes

            detections = []
            if len(boxes) > 0:
                for cid, bbox in zip(boxes.cls.tolist(), boxes.xyxy.tolist()):
                    detections.append({
                        "class_name": classes[int(cid)],
                        "bbox": [float(x) for x in bbox]
                    })

            await websocket.send_text(json.dumps({"detections": detections}))
    except Exception as e:
        print("WebSocket closed", e)
        await websocket.close()
        
      
if __name__=='__main__':      
    import uvicorn
    uvicorn.run(
        "video_api:app", 
        host="0.0.0.0",
        port=8002,
        reload=True
    )