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

  return changes;
}
