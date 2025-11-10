export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 shadow-lg">
            <span className="text-white text-3xl">📧</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Email Address</h3>
                    <p className="text-gray-600">minhtuan2004s@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Phone Number</h3>
                    <p className="text-gray-600">+84 397 856 773</p>
                    <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9AM-6PM (GMT+7)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Location</h3>
                    <p className="text-gray-600">Hanoi, Vietnam</p>
                    <p className="text-sm text-gray-500 mt-1">GMT+7 Timezone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Quick Links</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Documentation", desc: "Learn how to use our platform", icon: "📚", color: "from-blue-500 to-blue-600" },
                  { title: "Support Center", desc: "Find answers to common questions", icon: "🛠️", color: "from-green-500 to-green-600" },
                  { title: "Feature Requests", desc: "Suggest new features", icon: "💡", color: "from-yellow-500 to-orange-500" },
                  { title: "Bug Reports", desc: "Report issues or bugs", icon: "🐛", color: "from-red-500 to-red-600" }
                ].map((link, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-white">{link.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{link.title}</h3>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <p className="text-blue-100 mb-6">Stay updated with our latest news and announcements</p>
              
              <div className="flex space-x-4">
                {[
                  { name: "LinkedIn", icon: "💼", color: "bg-blue-700 hover:bg-blue-800" },
                  { name: "Twitter", icon: "🐦", color: "bg-blue-400 hover:bg-blue-500" },
                  { name: "GitHub", icon: "💻", color: "bg-gray-800 hover:bg-gray-900" },
                  { name: "Email", icon: "📧", color: "bg-red-600 hover:bg-red-700" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 ${social.color} rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                    title={social.name}
                  >
                    <span className="text-white">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't find what you're looking for? Check out our most commonly asked questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our phone number."
              },
              {
                question: "Do you offer technical support?",
                answer: "Yes! We provide comprehensive technical support for all our users. Our support team is available Mon-Fri, 9AM-6PM (GMT+7)."
              },
              {
                question: "Can I schedule a demo?",
                answer: "Absolutely! We'd be happy to show you our platform. Please mention 'Demo Request' in your message subject."
              },
              {
                question: "What are your business hours?",
                answer: "Our business hours are Monday to Friday, 9AM to 6PM (GMT+7). We're based in Hanoi, Vietnam."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-gray-800 text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}