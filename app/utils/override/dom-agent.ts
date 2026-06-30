import type {
  StandardDiffType,
  ContextNodeSnapshot,
  DiffSummarySnapshot as OldDiffSummarySnapshot,
} from "node_modules/@ticuong78/dom-agent";

export type DiffSummarySnapshot = OldDiffSummarySnapshot & {
  added: number;
  removed: number;
  modified: number;
  moved: number;
  resized: number;
  neutral: number;

  byType: Partial<Record<StandardDiffType, number>>;
};

export type DiffPointSnapshot = {
  type: StandardDiffType | string;

  referenceNode: ContextNodeSnapshot | null;
  targetNode: ContextNodeSnapshot | null;

  referenceParentNode?: ContextNodeSnapshot | null;
  targetParentNode?: ContextNodeSnapshot | null;

  delta?: number;
  source?: string;
};

export * from "node_modules/@ticuong78/dom-agent";
