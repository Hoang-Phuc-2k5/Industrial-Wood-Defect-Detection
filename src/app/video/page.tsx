"use client";

import { useEffect, useRef, useState } from "react";

interface Detection {
  class_name: string;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
}

export default function RealtimeYOLOPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup khi unmount
      if (ws) ws.close();
      if (intervalId) clearInterval(intervalId);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startStreaming = async () => {
    // Mở webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
    videoRef.current?.play();

    // Mở WebSocket
    const socket = new WebSocket("ws://localhost:8002/ws_detect");
    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      drawDetections(data.detections);
    };
    setWs(socket);

    // Bắt đầu loop gửi frame
    const id = setInterval(() => captureFrame(socket), 100); // ~10fps
    setIntervalId(id);

    setStreaming(true);
  };

  const stopStreaming = () => {
    if (intervalId) clearInterval(intervalId);
    if (ws) ws.close();
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  const captureFrame = (socket: WebSocket) => {
    if (!videoRef.current || !canvasRef.current || socket.readyState !== WebSocket.OPEN) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // encode ảnh

    socket.send(JSON.stringify({ image: dataUrl })); // gửi frame lên backend
  };

  const drawDetections = (detections: Detection[]) => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Vẽ video background
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    // Vẽ bbox
    detections.forEach(det => {
      const [x1, y1, x2, y2] = det.bbox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      ctx.fillStyle = "red";
      ctx.font = "16px Arial";
      ctx.fillText(det.class_name, x1, y1 > 10 ? y1 - 5 : 10);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Realtime YOLO Detection</h1>
      <div className="relative">
        <video ref={videoRef} className="rounded border" autoPlay muted />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="flex gap-4">
        {!streaming ? (
          <button
            onClick={startStreaming}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopStreaming}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
