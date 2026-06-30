import type {
  ContextNodeSnapshot,
  DiffPointSnapshot,
  StandardDiffType,
} from "@ticuong78/dom-agent";

export type DiffVisualKind =
  | "added"
  | "removed"
  | "changed"
  | "moved"
  | "resized"
  | "neutral";

export type AttributeChange = {
  key: string;
  before: string | null;
  after: string | null;
  status: "added" | "removed" | "changed";
};

const STANDARD_DIFF_TYPES = [
  "ADDED",
  "DELETED",
  "REORDERED",
  "REPARENTED",
  "TAG_CHANGED",
  "ATTRIBUTE_CHANGED",
  "TEXT_CHANGED",
  "GROWN",
  "SHRUNK",
  "DEPTH_CHANGED",
] as const satisfies readonly StandardDiffType[];

const VISUAL_KIND_BY_TYPE = {
  ADDED: "added",
  DELETED: "removed",

  REORDERED: "moved",
  REPARENTED: "moved",

  TAG_CHANGED: "changed",
  ATTRIBUTE_CHANGED: "changed",
  TEXT_CHANGED: "changed",
  DEPTH_CHANGED: "changed",

  GROWN: "resized",
  SHRUNK: "resized",
} as const satisfies Record<StandardDiffType, DiffVisualKind>;

export function isStandardDiffType(type: string): type is StandardDiffType {
  return STANDARD_DIFF_TYPES.includes(type as StandardDiffType);
}

export function getDiffVisualKind(type: string): DiffVisualKind {
  if (!isStandardDiffType(type)) {
    return "neutral";
  }

  return VISUAL_KIND_BY_TYPE[type];
}

export function getDiffTone(type: string) {
  const kind = getDiffVisualKind(type);

  switch (kind) {
    case "added":
      return {
        card: "bg-teal-950/30 border-teal-500/40",
        badge: "bg-teal-400 text-slate-950",
      };

    case "removed":
      return {
        card: "bg-rose-950/30 border-rose-500/40",
        badge: "bg-rose-500 text-rose-50",
      };

    case "moved":
      return {
        card: "bg-cyan-950/30 border-cyan-500/40",
        badge: "bg-cyan-400 text-slate-950",
      };

    case "resized":
      return {
        card: "bg-violet-950/30 border-violet-500/40",
        badge: "bg-violet-400 text-slate-950",
      };

    case "changed":
      return {
        card: "bg-amber-950/30 border-amber-500/40",
        badge: "bg-amber-400 text-slate-950",
      };

    default:
      return {
        card: "bg-slate-800/60 border-slate-700",
        badge: "bg-slate-600 text-white",
      };
  }
}

export function getFallbackSummary(diffs: DiffPointSnapshot[]) {
  return diffs.reduce(
    (acc, diff) => {
      const kind = getDiffVisualKind(diff.type);

      if (kind === "added") acc.added += 1;
      else if (kind === "removed") acc.removed += 1;
      else if (kind === "moved") acc.moved += 1;
      else if (kind === "resized") acc.resized += 1;
      else if (kind === "changed") acc.modified += 1;
      else acc.neutral += 1;

      return acc;
    },
    {
      added: 0,
      removed: 0,
      modified: 0,
      moved: 0,
      resized: 0,
      neutral: 0,
    },
  );
}

export function getAttributeChanges(
  beforeNode: ContextNodeSnapshot | null,
  afterNode: ContextNodeSnapshot | null,
): AttributeChange[] {
  const beforeAttrs = beforeNode?.attributeAnalytic ?? {};
  const afterAttrs = afterNode?.attributeAnalytic ?? {};

  const keys = Array.from(
    new Set([...Object.keys(beforeAttrs), ...Object.keys(afterAttrs)]),
  ).sort();

  const changes: AttributeChange[] = [];

  for (const key of keys) {
    const before = beforeAttrs[key]?.actualValue ?? null;
    const after = afterAttrs[key]?.actualValue ?? null;

    if (before === after) continue;

    if (before === null) {
      changes.push({
        key,
        before,
        after,
        status: "added",
      });
      continue;
    }

    if (after === null) {
      changes.push({
        key,
        before,
        after,
        status: "removed",
      });
      continue;
    }

    changes.push({
      key,
      before,
      after,
      status: "changed",
    });
  }

  return changes;
}

export function getNodeLabel(node: ContextNodeSnapshot) {
  const id = node.attributeAnalytic.id?.actualValue;
  const className = node.attributeAnalytic.class?.actualValue;

  const idPart = id ? ` id="${clip(id, 32)}"` : "";
  const classPart = className ? ` class="${clip(className, 56)}"` : "";

  return `<${node.tagName}${idPart}${classPart}>`;
}

export function formatDiffType(type: string) {
  return type.replaceAll("_", " ");
}

export function clip(value: string, max = 80) {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}
