export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 shadow-lg">
            <span className="text-white text-3xl">ℹ️</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            About AnomalyDetect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Pioneering the future of data analysis through advanced AI and machine learning technologies.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that every organization deserves access to powerful, intelligent data analysis tools. 
                Our mission is to democratize anomaly detection by making cutting-edge AI technology accessible, 
                intuitive, and actionable for businesses of all sizes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By combining the latest advances in machine learning with user-friendly design, we're helping 
                organizations around the world turn their data into strategic advantages.
              </p>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 text-center">🎯</div>
                <h3 className="text-2xl font-bold text-center mb-4">Our Vision</h3>
                <p className="text-center text-blue-100">
                  To be the global leader in AI-powered anomaly detection, enabling data-driven decisions 
                  that transform industries and improve lives worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Built with Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages the most advanced technologies to deliver unparalleled performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚛️",
                title: "Next.js",
                description: "Modern React framework for lightning-fast, server-side rendered web applications with optimal performance.",
                color: "from-gray-700 to-black"
              },
              {
                icon: "🐍",
                title: "Django",
                description: "Robust Python web framework providing secure, scalable backend infrastructure for complex data operations.",
                color: "from-green-600 to-green-800"
              },
              {
                icon: "🌶️",
                title: "Flask",
                description: "Lightweight, flexible Python microframework enabling rapid development of API endpoints and microservices.",
                color: "from-red-500 to-pink-600"
              }
            ].map((tech, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tech.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {tech.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach to anomaly detection combines innovation, reliability, and ease of use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🧠",
                  title: "Machine Learning",
                  description: "Advanced algorithms that learn and adapt to your data patterns"
                },
                {
                  icon: "📈",
                  title: "Real-time Analytics",
                  description: "Instant insights with live data processing and visualization"
                },
                {
                  icon: "🔧",
                  title: "Easy Integration",
                  description: "Seamless integration with existing systems and workflows"
                },
                {
                  icon: "🛡️",
                  title: "Enterprise Security",
                  description: "Bank-level security with compliance and data protection"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team/Contact CTA */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="text-6xl mb-6">👥</div>
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              We're a passionate team of data scientists, engineers, and designers committed to revolutionizing 
              how organizations understand and act on their data.
            </p>
            <button className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
              Get in Touch
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}