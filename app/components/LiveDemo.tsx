import { useState } from "react";
import { getDiffReport } from "~/utils/dagent.setup";
import { DiffReport } from "./diff-report";
import type { DiffReportProps } from "./diff-report/DiffReport";
import { createDiffSummary } from "~/utils/diff";

export function LiveDemo() {
  const [beforeHtml, setBeforeHtml] = useState(
    `<!DOCTYPE html>
<html lang="en">
<body>
  <div class="root" id="app" data-v="1">
    Version One

    <!-- TEXT_CHANGED: text will change -->
    <header class="site-header" data-s="header">Welcome Old</header>

    <!-- SHRUNK: will lose a child -->
    <nav class="site-nav" data-s="nav">
      <a class="lnk-home" data-to="home">Home</a>
      <a class="lnk-about" data-to="about">About</a>
      <a class="lnk-help" data-to="help">Help</a>
    </nav>

    <!-- REORDERED: children will swap -->
    <div class="columns" data-s="cols">
      <div class="col-left" data-pos="left">Left Panel</div>
      <div class="col-right" data-pos="right">Right Panel</div>
    </div>

    <!-- TRAP: uncle bob — must NOT match aunt sarah -->
    <div class="uncle" data-role="uncle">
      <span class="tag" data-who="bob">Uncle Bob</span>
    </div>

    <!-- TAG_CHANGED: div will become section -->
    <div class="bulletin" data-s="bulletin">
      <p class="note" data-id="n1">Note one</p>
    </div>

    <!-- ATTRIBUTE_CHANGED: will gain data-verified -->
    <div class="profile" data-s="profile">
      <p class="bio" data-id="bio">My bio</p>
    </div>

    <!-- REPARENTED: will move into a new wrapper -->
    <div class="widget" data-role="widget">
      <p class="w-body" data-id="w1">Widget body</p>
    </div>

    <!-- GROWN: will gain more images -->
    <div class="photos" data-s="photos">
      <img class="ph-one" data-id="p1" />
    </div>

    <!-- DEPTH_CHANGED: subtree will deepen without gaining direct children -->
    <div class="forum" data-s="forum">
      <div class="msg-a" data-id="ma">Message A</div>
      <div class="msg-b" data-id="mb">Message B</div>
    </div>

    <!-- DELETED: will be removed -->
    <footer class="old-footer" data-s="footer">
      <p class="bye" data-id="bye">Goodbye</p>
    </footer>
  </div>
</body>
</html>`,
  );

  const [afterHtml, setAfterHtml] = useState(
    `<!DOCTYPE html>
<html lang="en">
<body>
  <div class="root" id="app" data-v="1">
    Version Two

    <!-- TEXT_CHANGED -->
    <header class="site-header" data-s="header">Welcome New</header>

    <!-- SHRUNK: lost lnk-help -->
    <nav class="site-nav" data-s="nav">
      <a class="lnk-home" data-to="home">Home</a>
      <a class="lnk-about" data-to="about">About</a>
    </nav>

    <!-- REORDERED: children swapped -->
    <div class="columns" data-s="cols">
      <div class="col-right" data-pos="right">Right Panel</div>
      <div class="col-left" data-pos="left">Left Panel</div>
    </div>

    <!-- TRAP: aunt sarah — different attribute values -->
    <div class="aunt" data-role="aunt">
      <span class="tag" data-who="sarah">Aunt Sarah</span>
    </div>

    <!-- TAG_CHANGED: section instead of div, same attributes -->
    <section class="bulletin" data-s="bulletin">
      <p class="note" data-id="n1">Note one</p>
    </section>

    <!-- ATTRIBUTE_CHANGED: gained data-verified -->
    <div class="profile" data-s="profile" data-verified="true">
      <p class="bio" data-id="bio">My bio</p>
    </div>

    <!-- REPARENTED: widget now inside dock wrapper -->
    <div class="widget-dock" data-s="dock">
      <div class="widget" data-role="widget">
        <p class="w-body" data-id="w1">Widget body</p>
      </div>
    </div>

    <!-- GROWN: more images -->
    <div class="photos" data-s="photos">
      <img class="ph-one" data-id="p1" />
      <img class="ph-two" data-id="p2" />
      <img class="ph-three" data-id="p3" />
    </div>

    <!-- DEPTH_CHANGED: msg-a now has a nested reply, forum keeps 2 direct children -->
    <div class="forum" data-s="forum">
      <div class="msg-a" data-id="ma">
        Message A
        <div class="reply" data-id="r1">Reply to A</div>
      </div>
      <div class="msg-b" data-id="mb">Message B</div>
    </div>

    <!-- ADDED: entirely new -->
    <section class="promo" data-s="promo">
      <h2 class="promo-title" data-id="pt1">Special Offer</h2>
    </section>
  </div>
</body>
</html>`,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiffReportProps | null>(null);

  const handleRunDiff = () => {
    setIsLoading(true);

    const diffs = getDiffReport("composition", beforeHtml, afterHtml);
    const diffsSummary = createDiffSummary(diffs);

    setResult(diffsSummary);

    setIsLoading(false);
  };

  return (
    <section
      id="demo"
      className="mt-10 w-full bg-[#111827] text-white py-24 relative border-y border-slate-800"
    >
      <div className="absolute inset-0 z-0 bg-dots-dark opacity-80"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Tiêu đề ĐÃ ĐƯỢC ĐỒNG BỘ CHUẨN MỚI */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold font-mono tracking-widest mb-6 uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> 01 ·
            Live Sandbox
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight font-sans">
            Zero setup required.
          </h2>
          <p className="text-[#8b9bb4] max-w-2xl mx-auto text-lg font-light font-sans">
            Paste two HTML snapshots below. See the algorithmic diff instantly
            in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-[#1e293b]">
              <span className="text-[13px] font-bold font-mono text-white">
                before.html
              </span>
              <span className="bg-[#334155] text-white text-[10px] font-bold px-2 py-1 rounded">
                Editable
              </span>
            </div>
            <textarea
              aria-label="Old HTML Snapshot"
              value={beforeHtml}
              onChange={(e) => setBeforeHtml(e.target.value)}
              className="w-full h-64 bg-[#1e293b] text-white p-6 font-mono text-[14px] resize-none focus:outline-none code-scrollbar leading-relaxed selection:bg-teal-600/50"
              spellCheck="false"
            />
          </div>

          <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-5 py-3 border-b border-slate-700/50 flex justify-between items-center bg-[#1e293b]">
              <span className="text-[13px] font-bold font-mono text-white">
                after.html
              </span>
              <span className="bg-[#334155] text-white text-[10px] font-bold px-2 py-1 rounded">
                Editable
              </span>
            </div>
            <textarea
              aria-label="New HTML Snapshot"
              value={afterHtml}
              onChange={(e) => setAfterHtml(e.target.value)}
              className="w-full h-64 bg-[#1e293b] text-white p-6 font-mono text-[14px] resize-none focus:outline-none code-scrollbar leading-relaxed selection:bg-teal-600/50"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-10">
          <button
            onClick={handleRunDiff}
            disabled={isLoading}
            className="group px-6 py-3 bg-teal-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center gap-2 shadow-btn-teal btn-hover-lift hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-500 ${isLoading ? "animate-spin" : "group-hover:rotate-180"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            <span>{isLoading ? "Analyzing..." : "Run Analysis"}</span>
          </button>
        </div>

        {result && (
          <DiffReport
            diffPoints={result.diffPoints}
            {...(({ diffPoints, ...rest }) => rest)(result)}
          />
        )}
      </div>
    </section>
  );
}
