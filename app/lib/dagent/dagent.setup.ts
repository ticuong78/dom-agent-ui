import {
  CheerioAdapter,
  CompositeDiffViewer,
  HTMLToContextConverter,
  NodeMutationDiffViewer,
  SubtreeShapeDiffViewer,
  TreeHierarchyDiffViewer,
  type DiffPointSnapshot,
  type DiffViewerTypes,
} from "@ticuong78/dom-agent";
import { BrowserSHA256HashAdapter } from "../../utils/crypto/BrowserSHA256HashAdapter";
import { BrowserUUIDAdapter } from "../../utils/crypto/BrowserUUIDAdapter";

export const getDiffViewer = (type: DiffViewerTypes) => {
  switch (type) {
    case "hierarchy":
      return new TreeHierarchyDiffViewer();
    case "mutation":
      return new NodeMutationDiffViewer();
    case "subshape":
      return new SubtreeShapeDiffViewer();
    case "composition":
      return new CompositeDiffViewer([
        new TreeHierarchyDiffViewer(),
        new NodeMutationDiffViewer(),
        new SubtreeShapeDiffViewer(),
      ]);
    default:
      throw new Error("Invalid diff viewer type.");
  }
};

export const getContextTree = (html: string) => {
  const adapter = new CheerioAdapter();
  const converter = new HTMLToContextConverter(
    new BrowserUUIDAdapter(),
    new BrowserSHA256HashAdapter(),
  );

  return converter.convert(adapter.parse(html)!);
};

export const getDiffReport = (
  type: DiffViewerTypes,
  beforeHtml: string,
  afterHtml: string,
): DiffPointSnapshot[] => {
  const diffViewer = getDiffViewer(type);

  const beforeContextTree = getContextTree(beforeHtml);
  const afterContextTree = getContextTree(afterHtml);

  return diffViewer
    .highlight(beforeContextTree!, afterContextTree!)
    .map((i) => i.serialize());
};
