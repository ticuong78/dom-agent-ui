import { useState } from "react";

export function Hero() {
  const [showToast, setShowToast] = useState(false);

  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText("npm i @ticuong78/dom-agent");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10 pt-10 md:pt-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="lg:col-span-5 flex flex-col items-start text-left relative z-20">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            v2.0 available on npm
          </div>

          <h1 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-6 leading-[1.1] text-slate-900">
            DOM diffing<br />
            without the<br />
            <span className="text-brand-600">ML black box.</span>
          </h1>

          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
            Pure algorithm. Decomposed scalar comparison. Explainable to every stakeholder. Catch DOM changes that matter, ignore the noise.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <a href="#demo" className="group px-6 py-3.5 bg-brand-500 text-white font-semibold text-base rounded-xl shadow-btn-teal btn-hover-lift w-full sm:w-auto text-center flex items-center justify-center gap-2">
              <span>Try the Demo</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a href="#features" className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-medium text-base rounded-xl hover:bg-slate-50 shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center">
              How it works
            </a>
          </div>

          {/* Sleek Code Snippet */}
          <div 
            className="w-full sm:w-auto inline-flex items-center justify-between gap-6 px-5 py-3 bg-slate-950 rounded-xl shadow-lg group cursor-pointer hover:shadow-xl transition-all border border-slate-800 selection:bg-brand-500/80 selection:text-white" 
            onClick={handleCopyCmd}
          >
            <div className="flex items-center gap-3 font-mono text-sm">
              <span className="text-brand-400 select-none">$</span>
              <span className="text-slate-300 tracking-tight">npm i @ticuong78/dom-agent</span>
            </div>
            <div className="relative">
              <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity pointer-events-none whitespace-nowrap shadow-md border border-slate-700 ${showToast ? 'opacity-100' : 'opacity-0'}`}>
                Copied!
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sleek Exploded IDE Ecosystem */}
        <div className="lg:col-span-7 relative h-112.5 mt-10 lg:mt-0 perspective-1000">
          {/* Lớp 1: Bản đồ DOM Tree */}
          <div className="absolute -top-4 right-8 w-60 rounded-2xl bg-white border border-slate-200 shadow-float z-10 animate-float-delayed p-4 hidden md:block">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span> Analysis Tree
            </div>
            <svg className="w-full h-28" viewBox="0 0 200 120" fill="none">
              <path d="M100 20 L50 60" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4" />
              <path d="M100 20 L150 60" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M50 70 L30 100" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="75" y="10" width="50" height="24" rx="6" fill="#f0fdfa" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="100" y="26" fill="#0f766e" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">div</text>
              <rect x="25" y="50" width="50" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <text x="50" y="66" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">h1</text>
              <rect x="125" y="50" width="50" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <text x="150" y="66" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">ul</text>
            </svg>
          </div>

          {/* Lớp 2: IDE Lõi */}
          <div className="absolute top-12 left-0 right-16 rounded-2xl border border-slate-800 bg-[#0b1120] shadow-2xl flex flex-col font-mono overflow-hidden z-20 transition-transform duration-500 hover:-translate-y-1 selection:bg-brand-500/80 selection:text-white">
            <div className="h-10 border-b border-slate-800 bg-[#0f172a] flex items-center px-4 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-red-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-green-500 transition-colors cursor-pointer"></div>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">diff_engine.ts</div>
              <div className="w-12"></div>
            </div>

            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-800 text-[12px] leading-loose p-2 h-65">
              <div className="py-2 w-full sm:w-1/2">
                <div className="px-3 pb-2 mb-2 text-[9px] text-slate-500 uppercase tracking-widest border-b border-slate-800">snapshot_A.html</div>
                <div className="flex px-2 code-row"><span className="w-6 shrink-0 text-slate-600">1</span> <span className="text-slate-300">&lt;<span className="text-blue-400">div</span> <span className="text-brand-300">class</span>=<span className="text-yellow-300">"card"</span>&gt;</span></div>
                <div className="flex px-2 bg-red-500/10 border-l-2 border-red-500 code-row"><span className="w-6 shrink-0 text-slate-600">2</span> <span className="line-through opacity-70 text-red-300">&lt;<span className="text-blue-400">h1</span>&gt;User&lt;/<span className="text-blue-400">h1</span>&gt;</span></div>
                <div className="flex px-2 code-row"><span className="w-6 shrink-0 text-slate-600">3</span> <span className="text-slate-300">&lt;/<span className="text-blue-400">div</span>&gt;</span></div>
              </div>
              <div className="py-2 w-full sm:w-1/2 relative overflow-hidden group">
                <div className="px-3 pb-2 mb-2 text-[9px] text-brand-400 uppercase tracking-widest border-b border-slate-800 flex justify-between">snapshot_B.html <span className="text-yellow-500">~2ms</span></div>
                <div className="flex px-2 code-row"><span className="w-6 shrink-0 text-slate-600">1</span> <span className="text-slate-300">&lt;<span className="text-blue-400">div</span> <span className="text-brand-300">class</span>=<span className="text-yellow-300">"card"</span>&gt;</span></div>
                <div className="flex px-2 bg-brand-500/10 border-l-2 border-brand-400 code-row"><span className="w-6 shrink-0 text-slate-600">2</span> <span className="text-slate-200">&lt;<span className="text-blue-400">h2</span>&gt;<span className="bg-brand-500/30 px-1 rounded-sm">Dev</span>&lt;/<span className="text-blue-400">h2</span>&gt;</span></div>
                <div className="flex px-2 code-row"><span className="w-6 shrink-0 text-slate-600">3</span> <span className="text-slate-300">&lt;/<span className="text-blue-400">div</span>&gt;</span></div>
                <div className="absolute inset-x-0 h-px bg-brand-400/50 shadow-[0_0_10px_2px_rgba(20,184,166,0.3)] z-30 opacity-0 group-hover:opacity-100 animate-scan"></div>
              </div>
            </div>
          </div>

          {/* Lớp 3: JSON Output */}
          <div className="absolute -bottom-6 -left-4 w-64 rounded-2xl bg-white border border-slate-200 shadow-float z-30 animate-float p-4 hidden md:block">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-800"></span> Diff JSON</div>
              <span className="text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded text-[9px]">Parsed</span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400">{`{`}</span><br />
              &nbsp;&nbsp;<span className="text-slate-500">"target"</span>: <span className="text-brand-600">"h2"</span>,<br />
              &nbsp;&nbsp;<span className="text-slate-500">"type"</span>: <span className="text-blue-600">"REPLACE"</span>,<br />
              &nbsp;&nbsp;<span className="text-slate-500">"score"</span>: <span className="text-purple-600">0.98</span><br />
              <span className="text-slate-400">{`}`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}