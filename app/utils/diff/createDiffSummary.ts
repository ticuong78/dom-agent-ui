import type { DiffPointSnapshot, StandardDiffType } from "@ticuong78/dom-agent";
import type { DiffSummarySnapshot } from "@ticuong78/dom-agent";

export function createDiffSummary(
  diffs: DiffPointSnapshot[],
): DiffSummarySnapshot {
  // createdAt: string;
  // label: string | undefined;
  // totalDiffs: number;
  // diffPoints: DiffPointSnapshot[];

  const summary: DiffSummarySnapshot = {
    label: undefined,
    createdAt: Date.now().toString(),
    totalDiffs: diffs.length,
    diffPoints: diffs,
    added: 0,
    removed: 0,
    modified: 0,
    moved: 0,
    resized: 0,
    neutral: 0,

    byType: {},
  };

  for (const diff of diffs) {
    const type = diff.type as StandardDiffType;

    summary.byType[type] = (summary.byType[type] ?? 0) + 1;

    switch (diff.type) {
      case "ADDED":
        summary.added += 1;
        break;

      case "DELETED":
        summary.removed += 1;
        break;

      case "REORDERED":
      case "REPARENTED":
        summary.moved += 1;
        break;

      case "GROWN":
      case "SHRUNK":
        summary.resized += 1;
        break;

      case "TAG_CHANGED":
      case "ATTRIBUTE_CHANGED":
      case "TEXT_CHANGED":
      case "DEPTH_CHANGED":
        summary.modified += 1;
        break;

      default:
        summary.neutral += 1;
        break;
    }
  }

  return summary;
}
