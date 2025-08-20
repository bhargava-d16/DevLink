import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-white overflow-x-hidden">


      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
              💬
            </div>
            DevLink
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-colors">
              Login
            </button>
            
            <button
             onClick={() => navigate("/signup")} 
             className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center z-10">
        <div 
          className="max-w-4xl text-center px-6"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 mb-6 animate-bounce">
            ✨ New: Real-time collaboration features
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Code Together,
            <br />
            Chat Anywhere
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform combining real-time messaging with collaborative code editing. 
            Import GitHub repositories, chat with your team, and build amazing projects together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
              Start Coding Now
            </button>
            <button className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-600 bg-gray-800/50 backdrop-blur hover:bg-gray-700/50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative max-w-6xl mx-auto py-24 px-6 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400">
            Powerful features designed for modern development teams
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "💬",
              title: "Real-time Chat",
              desc: "Instant messaging with your team members. Share ideas, discuss code, and stay connected.",
            },
            {
              icon: "⚡",
              title: "Monaco Code Editor",
              desc: "Industry-leading code editor with syntax highlighting and IntelliSense, right in your browser.",
            },
            {
              icon: "🌿",
              title: "GitHub Integration", 
              desc: "Seamlessly import your GitHub repositories and edit code directly from your repos.",
            },
            {
              icon: "👥",
              title: "Collaborative Editing",
              desc: "Work together in real-time. See your teammates' cursors and edit simultaneously.",
            },
            {
              icon: "🎨",
              title: "Beautiful Interface",
              desc: "Clean, modern, and intuitive design that gets out of your way and focuses on your code.",
            },
            {
              icon: "🚀",
              title: "Lightning Fast",
              desc: "Optimized for performance with instant loading and real-time synchronization.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 mb-4 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-y border-purple-500/30 py-20 my-12 z-10">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of developers who are already coding and chatting together on QuickChat
          </p>
          <button className="px-10 py-4 rounded-full text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-xl">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-purple-400 font-bold text-xl mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
              💬
            </div>
            QuickChat
          </div>
          <p className="text-gray-400">
            © 2024 QuickChat. Built for developers, by developers.
          </p>
        </div>
      </footer>
    </div>
  );
}