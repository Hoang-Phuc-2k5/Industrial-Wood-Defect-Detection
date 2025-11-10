"use client";
import { useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Upload, ImageIcon, Settings, BarChart3, Eye, Trash2, CheckCircle } from 'lucide-react';

export default function AnomalyDetectionPage() {
  const classesList = ["Crack","Marrow","Quartzity","resin","Dead_Knot","Live_Knot","Knot_missing","knot_with_crack"];
  const qualityThresholdList = [0,1,2]; // dùng index cho 3 thresholds

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [totalErrors, setTotalErrors] = useState<number | null>(null);
  const [classCounts, setClassCounts] = useState<any>(null);
  const [quality, setQuality] = useState<string | null>(null);

  const [threshold, setThreshold] = useState<string>("0.5");
  const [classWeights, setClassWeights] = useState<any>({
    "Crack":3,"Marrow":2,"Quartzity":1,"resin":1,
    "Dead_Knot":1,"Live_Knot":1,"Knot_missing":2,"knot_with_crack":2
  });
  const [qualityThresholds, setQualityThresholds] = useState<any>([2,5,10]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedImage(null);
      setTotalErrors(null);
      setClassCounts(null);
      setQuality(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("threshold", threshold);
    formData.append("class_weights", JSON.stringify(classWeights));
    formData.append("quality_thresholds", JSON.stringify(qualityThresholds));

    try {
      const response = await fetch("http://127.0.0.1:8000/api/receive-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setProcessedImage(`data:image/jpeg;base64,${data.image}`);
      setTotalErrors(data.total_errors);
      setClassCounts(data.class_counts);
      setQuality(data.quality);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. See console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedImage(null);
    setTotalErrors(null);
    setClassCounts(null);
    setQuality(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Prepare chart data
  const chartData = classCounts ? Object.entries(classCounts).map(([name, count]) => ({
    name: name.replace(/_/g, ' '),
    count: count,
    weight: classWeights[name] || 1
  })) : [];

  const pieData = chartData.filter(item => item.count > 0);

  const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#84cc16'];

  const getQualityColor = (quality: string) => {
    switch (quality?.toLowerCase()) {
      case 'excellent': case 'good': return 'text-emerald-600 bg-emerald-50';
      case 'fair': case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'poor': case 'bad': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Anomaly Detection
                </h1>
                <p className="text-gray-600">AI-powered wood defect analysis</p>
              </div>
            </div>
            <a href="/documents" className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              📖 Documentation
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Upload & Parameters */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Image Upload Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <Upload className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Upload Image</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <div className="space-y-3">
                      <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto rounded-lg shadow-md" />
                      <p className="text-sm text-gray-600 font-medium">{selectedFile?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <p className="text-gray-600 group-hover:text-blue-600 transition-colors">
                        Click to select an image
                      </p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              </div>
            </div>

            {/* Parameters Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <Settings className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Parameters</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Detection Threshold */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Detection Threshold</label>
                  <input 
                    type="number" 
                    step="0.001" 
                    value={threshold} 
                    onChange={(e)=>setThreshold(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  />
                </div>

                {/* Class Weights */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Class Weights</label>
                  <div className="grid grid-cols-1 gap-3">
                    {classesList.map((cls, idx) => (
                      <div key={cls} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 capitalize">{cls.replace(/_/g, ' ')}</span>
                        <input 
                          type="number" 
                          value={classWeights[cls]} 
                          min={0} 
                          onChange={(e)=>setClassWeights({...classWeights, [cls]: Number(e.target.value)})}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Thresholds */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Quality Thresholds</label>
                  <div className="grid grid-cols-3 gap-3">
                    {qualityThresholds.map((val: number, idx: number) => (
                      <div key={idx} className="text-center">
                        <label className="block text-xs text-gray-600 mb-1">Level {idx+1}</label>
                        <input 
                          type="number" 
                          value={val} 
                          min={0}
                          onChange={(e)=>{
                            const newArr = [...qualityThresholds];
                            newArr[idx] = Number(e.target.value);
                            setQualityThresholds(newArr);
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <button 
                    onClick={handleUpload} 
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5" />
                        Analyze Image
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleClear} 
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="xl:col-span-2">
            {processedImage ? (
              <div className="space-y-6">
                
                {/* Results Summary */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                    <div className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-6 h-6" />
                      <h2 className="text-xl font-bold">Analysis Results</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{totalErrors}</div>
                        <div className="text-sm text-gray-600 font-medium">Total Defects</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600 mb-1">{threshold}</div>
                        <div className="text-sm text-gray-600 font-medium">Detection Threshold</div>
                      </div>
                      <div className="text-center p-4 rounded-xl">
                        <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getQualityColor(quality || '')}`}>
                          {quality}
                        </div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Quality Grade</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Results */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                    <h3 className="text-xl font-bold text-white">Processed Image</h3>
                  </div>
                  <div className="p-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
                      <img 
                        src={processedImage} 
                        alt="Processed result"
                        className="w-full h-auto" 
                      />
                    </div>
                  </div>
                </div>

                {/* Charts */}
                {chartData.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Bar Chart */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
                        <h3 className="text-xl font-bold text-white">Defect Distribution</h3>
                      </div>
                      <div className="p-6">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="name" 
                              fontSize={12}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Bar 
                              dataKey="count" 
                              fill="#8b5cf6"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    {pieData.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6">
                          <h3 className="text-xl font-bold text-white">Defect Types</h3>
                        </div>
                        <div className="p-6">
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'white', 
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Statistics */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6">
                    <h3 className="text-xl font-bold text-white">Detailed Statistics</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {classCounts && Object.entries(classCounts).map(([cls, cnt], idx) => (
                        <div key={cls} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold mb-1" style={{color: colors[idx % colors.length]}}>
                            {cnt}
                          </div>
                          <div className="text-sm text-gray-600 font-medium capitalize">
                            {cls.replace(/_/g, ' ')}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Weight: {classWeights[cls]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
                <div className="p-12 text-center">
                  <ImageIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-400 mb-3">No Results Yet</h3>
                  <p className="text-gray-500 text-lg">Upload an image and click "Analyze Image" to see the detection results here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}