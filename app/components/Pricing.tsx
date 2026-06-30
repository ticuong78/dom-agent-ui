export function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 bg-[#fafafa] border-t border-slate-200">
      
      {/* Khối tiêu đề đồng bộ chuẩn mới: 04 */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-600 text-sm font-bold font-mono tracking-widest mb-6 uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 04 · Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-sans">
          Simple Pricing
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light font-sans">
          The npm package is free. Pay only for the hosted high-volume API.
        </p>
      </div>

      {/* Lưới 3 cột đầy đủ không thiếu một dòng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
        
        {/* Cột 1: Hobby */}
        <div className="flex flex-col p-8 rounded-3xl border border-slate-200 bg-white shadow-sm h-full hover:shadow-md transition-shadow">
          <h4 className="text-lg font-semibold text-slate-900 mb-1 font-sans">Hobby</h4>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-bold text-slate-900">$0</span>
          </div>
          <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6 font-sans">For learning and prototyping.</p>
          <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8 grow font-sans">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              100 reqs / day
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Community support
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium text-sm mt-auto font-sans">Get API Key</button>
        </div>

        {/* Cột 2: Team */}
        <div className="flex flex-col p-8 rounded-3xl border border-teal-500 bg-teal-50 text-slate-900 relative shadow-lg h-full transform lg:-translate-y-2">
          <div className="absolute -top-3 inset-x-0 flex justify-center">
            <span className="bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm font-sans">Recommended</span>
          </div>
          <h4 className="text-lg font-semibold text-teal-900 mb-1 mt-2 font-sans">Team</h4>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-bold text-teal-700">$19</span>
            <span className="text-teal-600/70 text-sm">/mo</span>
          </div>
          <p className="text-sm text-teal-700/80 mb-6 border-b border-teal-200 pb-6 font-sans">E2E tests & scraper monitoring.</p>
          <ul className="flex flex-col gap-4 text-sm text-teal-800 mb-8 grow font-sans">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              100k reqs / month
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Webhooks
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Email support
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-teal-500 text-white hover:bg-teal-600 transition-colors font-medium text-sm mt-auto font-sans">Start Trial</button>
        </div>

        {/* Cột 3: Scale */}
        <div className="flex flex-col p-8 rounded-3xl border border-slate-200 bg-white shadow-sm h-full hover:shadow-md transition-shadow">
          <h4 className="text-lg font-semibold text-slate-900 mb-1 font-sans">Scale</h4>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-bold text-slate-900">$99</span>
            <span className="text-slate-400 text-sm">/mo</span>
          </div>
          <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6 font-sans">Strict SLAs for production.</p>
          <ul className="flex flex-col gap-4 text-sm text-slate-600 mb-8 grow font-sans">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              1M reqs / month
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Priority support
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
              Custom limits
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm mt-auto font-sans">Contact Sales</button>
        </div>

      </div>
    </section>
  );
}