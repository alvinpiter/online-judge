export interface TreeNode {
  id: string;
  parentId: string;
  index: number;
  childrenIds: string[];
}

export enum TreeNodeChangeType {
  ADDITION = "addition",
  DELETION = "deletion",
}

export interface TreeNodeChange {
  type: TreeNodeChangeType;
  node: TreeNode;
}

export type IdToTreeNodeMap = { [id: string]: TreeNode };

export interface TreeNodeAdditionParameter {
  parentId: string;
  index: number;
}

export interface TreeNodeContextValue {
  idToTreeNodeMap: IdToTreeNodeMap;
  addTreeNode: (parameter: TreeNodeAdditionParameter) => void;
}
