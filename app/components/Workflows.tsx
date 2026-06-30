export function Workflows() {
  return (
    <section id="workflows" className="max-w-7xl mx-auto px-6 py-24 relative bg-[#fafafa]">
      <div className="absolute inset-0 z-0 pointer-events-none bg-dots opacity-40"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-600 text-sm font-bold font-mono tracking-widest mb-8 uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 03 · Workflows
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] font-sans">
            Four ways in.<br />Same identical engine.
          </h2>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-12 font-sans">
            Whether you are writing a quick shell script, integrating into Playwright E2E tests, or building a massive scraper, tracui has a surface for you.
          </p>

          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg font-sans">npm Package (@ticuong78/dom-agent)</h4>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-sans">Direct integration into Node.js, Playwright, or Puppeteer.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6M12 19h8"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg font-sans">CLI Tool</h4>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-sans">Run <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">npx tracui diff file1 file2</code> directly in your terminal or Git hooks.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg font-sans">Hosted API</h4>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-sans">Language agnostic REST API. POST HTML, get JSON diffs back instantly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden font-mono text-[13px] flex flex-col h-full max-h-125">
          <div className="flex items-center px-4 border-b border-slate-800 bg-[#161b22]">
            <div className="py-3 px-4 text-teal-400 border-b-2 border-teal-400 font-bold text-xs">Node.js</div>
            <div className="py-3 px-4 text-slate-500 hover:text-slate-300 cursor-pointer text-xs font-semibold transition-colors">cURL</div>
          </div>
          <div className="p-6 text-slate-300 leading-loose overflow-x-auto code-scrollbar">
            <div className="mb-4"><span className="text-[#ff7b72]">import</span> {`{ diffDOM }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@ticuong78/dom-agent'</span>;</div>
            <div className="mb-4"><span className="text-[#8b949e]">// Fetch your pages</span><br /><span className="text-[#ff7b72]">const</span> oldHtml = <span className="text-[#ff7b72]">await</span> <span className="text-[#d2a8ff]">fetch</span>(...);<br /><span className="text-[#ff7b72]">const</span> newHtml = <span className="text-[#ff7b72]">await</span> <span className="text-[#d2a8ff]">fetch</span>(...);</div>
            <div className="mb-4"><span className="text-[#8b949e]">// Run pure algorithmic comparison</span><br /><span className="text-[#ff7b72]">const</span> result = <span className="text-[#d2a8ff]">diffDOM</span>(oldHtml, newHtml, {`{`}<br />&nbsp;&nbsp;ignoreClasses: [<span className="text-[#a5d6ff]">'dynamic-time'</span>],<br />&nbsp;&nbsp;focusSelectors: [<span className="text-[#a5d6ff]">'.pricing-table'</span>]<br />{`}`});</div>
            <div><span className="text-[#79c0ff]">console</span>.<span className="text-[#d2a8ff]">log</span>(result.hasSignificantChanges); <span className="text-[#8b949e]">// true</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}