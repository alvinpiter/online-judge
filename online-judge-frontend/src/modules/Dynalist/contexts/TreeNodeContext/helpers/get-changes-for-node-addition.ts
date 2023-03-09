import { getRandomId } from "../../../helpers/getRandomId";
import {
  IdToTreeNodeMap,
  TreeNode,
  TreeNodeAdditionParameter,
  TreeNodeChange,
  TreeNodeChangeType,
} from "../interfaces";

export function getChangesForNodeAddition(
  idToTreeNodeMap: IdToTreeNodeMap,
  additionParameter: TreeNodeAdditionParameter
): TreeNodeChange[] {
  const changes: TreeNodeChange[] = [];

  // Create the new node
  const newNode: TreeNode = {
    id: getRandomId(),
    parentId: additionParameter.parentId,
    index: additionParameter.index,
    childrenIds: [],
  };

  changes.push({
    type: TreeNodeChangeType.ADDITION,
    node: newNode,
  });

  // The parent's (if any) children should change
  const parent = idToTreeNodeMap[additionParameter.parentId];

  changes.push({
    type: TreeNodeChangeType.DELETION,
    node: parent,
  });

  const newParent: TreeNode = {
    ...parent,
    childrenIds: [
      ...parent.childrenIds.slice(0, additionParameter.index),
      newNode.id,
      ...parent.childrenIds.slice(additionParameter.index),
    ],
  };

  changes.push({
    type: TreeNodeChangeType.ADDITION,
    node: newParent,
  });

  // Siblings with index >= insertion index should change
  parent.childrenIds.forEach((siblingId) => {
    const sibling = idToTreeNodeMap[siblingId];
    if (sibling.index >= additionParameter.index) {
      changes.push({
        type: TreeNodeChangeType.DELETION,
        node: sibling,
      });

      const newSibling: TreeNode = { ...sibling, index: sibling.index + 1 };

      changes.push({
        type: TreeNodeChangeType.ADDITION,
        node: newSibling,
      });
    }
  });

  return changes;
}
