import { StandardDiffType, ContextNodeSnapshot } from "@ticuong78/dom-agent";

declare module "@ticuong78/dom-agent" {
  type DiffPointSnapshot = {
    type: StandardDiffType;

    referenceNode: ContextNodeSnapshot | null;
    targetNode: ContextNodeSnapshot | null;

    referenceParentNode?: ContextNodeSnapshot | null;
    targetParentNode?: ContextNodeSnapshot | null;

    delta?: number;
    source?: string;
  };

  type DiffSummarySnapshot = {
    /** ISO 8601 date string of when the summary was generated. */
    createdAt: string;
    /** Optional human-readable label for this summary. */
    label: string | undefined;
    /** Total number of diff points in this summary. */
    totalDiffs: number;
    /** All serialized diff points. */
    diffPoints: DiffPointSnapshot[];

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
