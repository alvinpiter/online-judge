export interface TreeNode {
  id: number;
  parentId: number;
  index: number;
  childrenIds: number[];
}

export type IdToTreeNodeMap = { [id: number]: TreeNode };

export interface TreeNodeContextValue {
  idToTreeNodeMap: IdToTreeNodeMap;
}
