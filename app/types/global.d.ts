export {};

import {
  StandardDiffType,
  ContextNodeSnapshot,
  DiffSummarySnapshot as OldDiffSummarySnapshot,
} from "@ticuong78/dom-agent";

declare global {
  type DiffPointSnapshot = {
    type: StandardDiffType;

    referenceNode: ContextNodeSnapshot | null;
    targetNode: ContextNodeSnapshot | null;

    referenceParentNode?: ContextNodeSnapshot | null;
    targetParentNode?: ContextNodeSnapshot | null;

    delta?: number;
    source?: string;
  };

  type DiffSummarySnapshot = OldDiffSummarySnapshot & {
    added: number;
    removed: number;
    modified: number;
    moved: number;
    resized: number;
    neutral: number;

    byType: Partial<Record<StandardDiffType, number>>;
  };

  type DiffPointSnapshot = {
    type: StandardDiffType | string;

    referenceNode: ContextNodeSnapshot | null;
    targetNode: ContextNodeSnapshot | null;

    referenceParentNode?: ContextNodeSnapshot | null;
    targetParentNode?: ContextNodeSnapshot | null;

    delta?: number;
    source?: string;
  };
}
