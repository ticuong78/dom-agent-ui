export function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Subscribed! (Replace with actual API call later)');
  };

  return (
    <>
      <section id="subscribe" className="w-full bg-[#020617] py-24 relative border-t border-slate-800">
        <div className="absolute inset-0 z-0 bg-dots-dark opacity-40"></div>
        <div className="absolute top-0 right-1/4 w-125 h-125 bg-brand-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12 text-center">
            <div className="text-sm font-mono text-[#00e5e5] uppercase tracking-widest mb-4">
              <span className="text-[#00e5e5] mr-2">•</span> 05 · Stay updated
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight font-sans">
              Release notes. Not marketing.
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light font-sans">
              One email per release. No fluff, just changelogs and diff rules.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto" onSubmit={handleSubscribe}>
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input 
                type="email" 
                required 
                placeholder="dev@company.com" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm shadow-inner" 
              />
            </div>
            <button type="submit" className="px-7 py-3.5 bg-brand-500 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(20,184,166,0.5)] hover:bg-brand-400 hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.6)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-5 font-sans">Unsubscribe anytime. We respect your inbox.</p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#fafafa] pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-white">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight font-sans">tracui</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium font-sans">
            <a href="#" className="hover:text-brand-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-brand-600 transition-colors">npm</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
            <span className="text-slate-300">|</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}