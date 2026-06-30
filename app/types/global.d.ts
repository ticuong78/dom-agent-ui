export {};

import { StandardDiffType, ContextNodeSnapshot } from "@ticuong78/dom-agent";

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
}
