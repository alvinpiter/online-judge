export interface TreeNode {
  id: number;
  parentId: number;
  index: number;
  childrenIds: number[];
}

export enum TreeNodeChangeType {
  ADDITION = "ADDITION",
  DELETION = "DELETION",
}

export interface TreeNodeChange {
  type: TreeNodeChangeType;
  node: TreeNode;
}

export type IdToTreeNodeMap = { [id: number]: TreeNode };

export interface TreeNodeAdditionParameter {
  parentId: number;
  index: number;
}

export interface TreeNodeContextValue {
  idToTreeNodeMap: IdToTreeNodeMap;
  addTreeNode: (parameter: TreeNodeAdditionParameter) => void;
}
