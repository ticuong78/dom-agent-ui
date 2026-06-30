export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 group text-slate-900">
          <div className="w-7 h-7 bg-brand-500 rounded-md flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          tracui
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#demo" className="hover:text-brand-600 transition-colors">Demo</a>
          <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
          <a 
            href="https://github.com/ticuong78/dom-agent-service" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm btn-hover-lift"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}