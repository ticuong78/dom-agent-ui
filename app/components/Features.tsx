export function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24 bg-white">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-600 text-sm font-bold font-mono tracking-widest mb-6 uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 02 · The Architecture
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-sans">
          Three reasons we skip ML.
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light font-sans">
          Other tools ship with heavy models. tracui ships with deterministic math.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
        <div className="md:col-span-2 p-8 sm:p-10 rounded-2xl border border-slate-200 bg-[#fafafa] shadow-sm flex flex-col justify-between group relative overflow-hidden transition-all hover:shadow-md hover:border-teal-200">
          <div className="absolute inset-0 bg-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-6xl sm:text-7xl font-bold text-slate-800 mb-4 tracking-tighter group-hover:text-teal-600 transition-colors">~75<span className="text-3xl text-slate-400">%</span></div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Less noise than pixel diff</h4>
            <p className="text-slate-500 leading-relaxed text-sm max-w-md">Multi-viewer composition reconciles structural, mutation, and shape diffs. Contradictions cancel out.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-2xl border border-slate-800 bg-slate-950 text-white flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/20">
          <div>
            <div className="text-6xl sm:text-7xl font-bold text-white mb-4 tracking-tighter group-hover:text-teal-400 transition-colors">0</div>
            <h4 className="text-xl font-bold mb-3">External dependencies</h4>
          </div>
          <p className="text-slate-400 text-sm">No GPU, no APIs. Deterministic input yields deterministic output.</p>
        </div>

        <div className="md:col-span-3 p-8 sm:p-10 rounded-3xl border border-teal-100 bg-teal-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group transition-all hover:bg-teal-50">
          <div className="shrink-0">
            <div className="text-6xl sm:text-7xl font-bold text-teal-600 mb-2 tracking-tighter">5</div>
            <h4 className="text-xl font-bold text-teal-900">Dimension categories</h4>
          </div>
          <p className="text-slate-600 leading-relaxed text-base max-w-3xl border-l-2 border-teal-200 pl-6">
            Tag surface, inner content, position, text, and parent context. When something diverges, you know exactly which dimension and by how much.
          </p>
        </div>
      </div>
    </section>
  );
}