import type {
  ContextNodeSnapshot,
  DiffPointSnapshot,
  DiffSummarySnapshot,
} from "@ticuong78/dom-agent";

import {
  clip,
  formatDiffType,
  getAttributeChanges,
  getDiffTone,
  getFallbackSummary,
  getNodeLabel,
  type AttributeChange,
} from "./diffReport.visual";

export type DiffReportProps = DiffSummarySnapshot;

export function DiffReport({ diffPoints, ...summary }: DiffReportProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#1e293b] overflow-hidden shadow-2xl">
      <DiffReportHeader diffs={diffPoints} summary={summary} />

      <div className="p-6 flex flex-col gap-4">
        {diffPoints.length === 0 ? (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 text-center">
            <p className="font-mono text-sm text-slate-400">
              No structural changes detected.
            </p>
          </div>
        ) : (
          diffPoints.map((diff, index) => (
            <DiffCard key={`${diff.type}-${index}`} diff={diff} />
          ))
        )}
      </div>
    </div>
  );
}

function DiffReportHeader({
  diffs,
  summary,
}: {
  diffs: DiffPointSnapshot[];
  summary?: Omit<DiffSummarySnapshot, "diffPoints">;
}) {
  const fallback = getFallbackSummary(diffs);

  const added = summary?.added ?? fallback.added;
  const removed = summary?.removed ?? fallback.removed;
  const modified = summary?.modified ?? fallback.modified;
  const moved = summary?.moved ?? fallback.moved;
  const resized = summary?.resized ?? fallback.resized;

  return (
    <div className="px-5 py-4 border-b border-slate-700/50 flex flex-wrap items-center gap-3 bg-[#1e293b]">
      <span className="text-[14px] font-black font-mono text-[#00ffff]">
        diff.report
      </span>

      <SummaryBadge
        label={`${diffs.length} DIFFS`}
        className="bg-slate-700 text-slate-200"
      />

      {added > 0 && (
        <SummaryBadge
          label={`${added} ADDED`}
          className="bg-teal-500/10 border border-teal-500/30 text-teal-300"
        />
      )}

      {removed > 0 && (
        <SummaryBadge
          label={`${removed} DELETED`}
          className="bg-rose-500/10 border border-rose-500/30 text-rose-300"
        />
      )}

      {modified > 0 && (
        <SummaryBadge
          label={`${modified} CHANGED`}
          className="bg-amber-500/10 border border-amber-500/30 text-amber-300"
        />
      )}

      {moved > 0 && (
        <SummaryBadge
          label={`${moved} MOVED`}
          className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
        />
      )}

      {resized > 0 && (
        <SummaryBadge
          label={`${resized} RESIZED`}
          className="bg-violet-500/10 border border-violet-500/30 text-violet-300"
        />
      )}
    </div>
  );
}

function SummaryBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`text-[10px] font-black px-2.5 py-1 rounded tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}

function DiffCard({ diff }: { diff: DiffPointSnapshot }) {
  const tone = getDiffTone(diff.type);

  const beforeNode = diff.referenceNode;
  const afterNode = diff.targetNode;

  const attributeChanges = getAttributeChanges(beforeNode, afterNode);

  const textChanged =
    Boolean(beforeNode) &&
    Boolean(afterNode) &&
    beforeNode!.directText.trim() !== afterNode!.directText.trim();

  return (
    <article className={`rounded-lg border p-5 ${tone.card}`}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase ${tone.badge}`}
        >
          {formatDiffType(diff.type)}
        </span>

        {diff.source && (
          <span className="bg-slate-800 text-slate-300 border border-slate-600 text-[10px] font-bold px-2 py-1 rounded font-mono">
            {diff.source}
          </span>
        )}

        {typeof diff.delta === "number" && (
          <span className="bg-slate-900 text-slate-300 border border-slate-600 text-[10px] font-bold px-2 py-1 rounded font-mono">
            Δ {diff.delta > 0 ? `+${diff.delta}` : diff.delta}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NodeBox title="Before" node={beforeNode} />
        <NodeBox title="After" node={afterNode} />
      </div>

      {(diff.referenceParentNode || diff.targetParentNode) && (
        <ParentChange
          beforeParent={diff.referenceParentNode ?? null}
          afterParent={diff.targetParentNode ?? null}
        />
      )}

      {textChanged && beforeNode && afterNode && (
        <TextChange beforeNode={beforeNode} afterNode={afterNode} />
      )}

      {attributeChanges.length > 0 && (
        <AttributeChangeList changes={attributeChanges} />
      )}
    </article>
  );
}

function NodeBox({
  title,
  node,
}: {
  title: string;
  node: ContextNodeSnapshot | null;
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950/30 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-black uppercase tracking-widest text-slate-400">
          {title}
        </span>

        {node && (
          <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-400">
            #{node.id}
          </span>
        )}
      </div>

      {!node ? (
        <p className="font-mono text-[13px] italic text-slate-500">null</p>
      ) : (
        <div className="space-y-3">
          <p className="font-mono text-[13px] leading-relaxed text-white">
            {getNodeLabel(node)}
          </p>

          {node.directText.trim() && (
            <p className="rounded border border-slate-700 bg-slate-900/70 px-3 py-2 font-mono text-[12px] text-slate-300">
              {clip(node.directText.trim(), 100)}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Metric label="depth" value={node.depth} />
            <Metric
              label="child"
              value={`${node.nthChild + 1}/${node.siblingCount}`}
            />
            <Metric label="attrs" value={node.attributeCount} />
            <Metric label="children" value={node.childCount} />
          </div>
        </div>
      )}
    </div>
  );
}

function AttributeChangeList({ changes }: { changes: AttributeChange[] }) {
  return (
    <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/30 p-4">
      <div className="mb-3 font-mono text-[11px] font-black uppercase tracking-widest text-slate-400">
        Attributes
      </div>

      <div className="space-y-2">
        {changes.map((change) => (
          <div
            key={change.key}
            className="grid grid-cols-1 md:grid-cols-[120px_1fr_24px_1fr] gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 font-mono text-[12px]"
          >
            <span className="font-bold text-slate-300">{change.key}</span>

            <AttrValue value={change.before} mode="before" />

            <span className="hidden md:block text-slate-500">→</span>

            <AttrValue value={change.after} mode="after" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AttrValue({
  value,
  mode,
}: {
  value: string | null;
  mode: "before" | "after";
}) {
  if (value == null) {
    return <span className="text-slate-600">—</span>;
  }

  if (mode === "before") {
    return (
      <span className="text-rose-200 line-through opacity-80">
        {clip(value, 90)}
      </span>
    );
  }

  return (
    <span className="w-fit rounded bg-amber-400 px-1.5 py-0.5 text-slate-950">
      {clip(value, 90)}
    </span>
  );
}

function TextChange({
  beforeNode,
  afterNode,
}: {
  beforeNode: ContextNodeSnapshot;
  afterNode: ContextNodeSnapshot;
}) {
  return (
    <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
      <div className="mb-3 font-mono text-[11px] font-black uppercase tracking-widest text-amber-300">
        Text changed
      </div>

      <div className="space-y-2 font-mono text-[12px]">
        <div>
          <span className="mr-2 text-slate-400">Old:</span>
          <span className="text-rose-200 line-through opacity-80">
            {clip(beforeNode.directText.trim(), 120)}
          </span>
        </div>

        <div>
          <span className="mr-2 text-slate-400">New:</span>
          <span className="rounded bg-amber-400 px-1.5 py-0.5 text-slate-950">
            {clip(afterNode.directText.trim(), 120)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ParentChange({
  beforeParent,
  afterParent,
}: {
  beforeParent: ContextNodeSnapshot | null;
  afterParent: ContextNodeSnapshot | null;
}) {
  return (
    <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4">
      <div className="mb-3 font-mono text-[11px] font-black uppercase tracking-widest text-cyan-300">
        Parent context
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_24px_1fr] gap-2 font-mono text-[12px]">
        <ParentBox node={beforeParent} />

        <span className="hidden md:block text-slate-500">→</span>

        <ParentBox node={afterParent} />
      </div>
    </div>
  );
}

function ParentBox({ node }: { node: ContextNodeSnapshot | null }) {
  if (!node) {
    return (
      <div className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-500">
        null
      </div>
    );
  }

  return (
    <div className="rounded border border-slate-700 bg-slate-900 px-3 py-2">
      <div className="text-slate-200">{getNodeLabel(node)}</div>

      <div className="mt-1 text-[10px] text-slate-500">
        depth {node.depth} · children {node.childCount} · attrs{" "}
        {node.attributeCount}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <span className="rounded border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300">
      <span className="text-slate-500">{label}</span>{" "}
      <span className="font-bold text-slate-200">{value ?? "—"}</span>
    </span>
  );
}
