"use client";

export default function ApiGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                YOLO API Guide
              </h1>
              <p className="text-gray-600 text-lg mt-1">Hệ thống phát hiện lỗi gỗ thông minh</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              API này nhận một ảnh và các tham số JSON để thực hiện phát hiện lỗi (defect detection) trên gỗ.
              Kết quả trả về bao gồm số lỗi, số lượng từng loại lỗi, chất lượng tổng thể, danh sách detections chi tiết và ảnh đã vẽ bounding box.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Endpoint Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Endpoint</h2>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">POST</span>
                <code className="text-lg font-mono text-gray-800">http://127.0.0.1:8001/predict</code>
              </div>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Copy URL
              </button>
            </div>
          </div>
        </div>

        {/* Parameters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Tham số JSON</h2>
          </div>
          
          <p className="text-gray-600 mb-6">Gửi kèm trong body hoặc form-data. JSON có thể có dạng:</p>
          
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-200">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
              <span className="text-gray-300 text-sm font-medium">JSON Parameters</span>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">Copy</button>
            </div>
            <pre className="text-green-400 p-6 overflow-x-auto text-sm leading-relaxed">
{`{
  "threshold": 0.5,
  "class_weights": {
    "Crack": 3,
    "Marrow": 2,
    "Quartzity": 1,
    "resin": 1,
    "Dead_Knot": 1,
    "Live_Knot": 1,
    "Knot_missing": 2,
    "knot_with_crack": 2
  },
  "quality_thresholds": [2, 5, 10]
}`}
            </pre>
          </div>

          {/* Parameter Explanations */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Giải thích các tham số
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">threshold</code>
                </h4>
                <p className="text-blue-700">Ngưỡng confidence (0-1) để xác định object được phát hiện. Confidence thấp hơn giá trị này sẽ bị loại.</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <code className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm">class_weights</code>
                </h4>
                <p className="text-purple-700">Trọng số cho từng loại lỗi. Ví dụ lỗi <code className="bg-purple-200 text-purple-800 px-1 py-0.5 rounded">Crack</code> quan trọng hơn nên trọng số cao hơn.</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <code className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">quality_thresholds</code>
                </h4>
                <p className="text-orange-700 mb-3">Ngưỡng điểm để đánh giá chất lượng tổng thể. Điểm được tính dựa trên số lượng detections và trọng số từng class:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-orange-700">Nếu điểm ≤ thresholds[0] → <strong>"Rất tốt"</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-orange-700">Nếu ≤ thresholds[1] → <strong>"Tốt"</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-orange-700">Nếu ≤ thresholds[2] → <strong>"Trung bình"</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-orange-700">Nếu lớn hơn thresholds[2] → <strong>"Rất tệ"</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Kết quả trả về</h2>
          </div>
          
          <p className="text-gray-600 mb-6">Kết quả trả về là JSON với cấu trúc sau:</p>
          
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-200">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
              <span className="text-gray-300 text-sm font-medium">Response JSON</span>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">Copy</button>
            </div>
            <pre className="text-emerald-400 p-6 overflow-x-auto text-sm leading-relaxed">
{`{
  "total_errors": 3,
  "class_counts": {
    "Crack": 1,
    "Marrow": 0,
    "Quartzity": 1,
    "resin": 0,
    "Dead_Knot": 0,
    "Live_Knot": 1,
    "Knot_missing": 0,
    "knot_with_crack": 0
  },
  "quality": "Tốt",
  "detections": [
    {
      "class_id": 0,
      "class_name": "Crack",
      "confidence": 0.85,
      "bbox": [100.0, 50.0, 200.0, 150.0]
    }
  ],
  "annotated_image": "<base64 string of image with bounding boxes>"
}`}
            </pre>
          </div>
        </div>

        {/* Usage Notes Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Lưu ý quan trọng</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Threshold Configuration</h4>
                  <p className="text-blue-700 text-sm">Luôn kiểm tra <code className="bg-blue-200 text-blue-800 px-1 py-0.5 rounded">threshold</code> phù hợp với model để tránh bỏ sót detections hoặc phát hiện quá nhiều.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Class Weights</h4>
                  <p className="text-purple-700 text-sm">Điều chỉnh <code className="bg-purple-200 text-purple-800 px-1 py-0.5 rounded">class_weights</code> theo độ quan trọng của từng loại lỗi trong dự án.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Quality Thresholds</h4>
                  <p className="text-green-700 text-sm">Quality thresholds có thể thay đổi tuỳ yêu cầu đánh giá chất lượng của dự án.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Image Output</h4>
                  <p className="text-orange-700 text-sm">Ảnh trả về trong <code className="bg-orange-200 text-orange-800 px-1 py-0.5 rounded">annotated_image</code> là dạng base64, có thể decode để hiển thị.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white">Hướng dẫn sử dụng</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Đây là guide để end user hiểu cách gửi ảnh và tham số, cũng như ý nghĩa các giá trị trong JSON.
            Hệ thống sẽ phân tích ảnh gỗ và trả về kết quả phát hiện lỗi một cách chi tiết và chính xác.
          </p>
        </div>
      </div>
    </div>
  );
}