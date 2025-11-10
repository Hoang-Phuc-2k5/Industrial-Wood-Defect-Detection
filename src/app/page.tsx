export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 shadow-lg">
            <span className="text-white text-3xl">🔍</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Welcome to AnomalyDetect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Harness the power of AI to detect patterns, identify anomalies, and gain insights from your data with unprecedented accuracy and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AnomalyDetect?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge platform combines machine learning with intuitive design to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🤖",
              title: "AI-Powered Detection",
              description: "Advanced machine learning algorithms that adapt and improve with your data patterns.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "⚡",
              title: "Real-time Processing",
              description: "Lightning-fast analysis that processes thousands of data points in milliseconds.",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: "📊",
              title: "Interactive Reports",
              description: "Beautiful, comprehensive reports with actionable insights and visualizations.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: "🔒",
              title: "Enterprise Security",
              description: "Bank-level security with end-to-end encryption and compliance standards.",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: "🌐",
              title: "Cloud Integration",
              description: "Seamless integration with popular cloud platforms and data sources.",
              color: "from-indigo-500 to-blue-500"
            },
            {
              icon: "📱",
              title: "Mobile Ready",
              description: "Access your insights anywhere with our responsive, mobile-optimized interface.",
              color: "from-teal-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "99.9%", label: "Accuracy Rate" },
              { number: "< 1ms", label: "Response Time" },
              { number: "1M+", label: "Data Points Processed" },
              { number: "24/7", label: "System Uptime" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies already using AnomalyDetect to transform their data analysis and decision-making processes.
          </p>
          <button className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}