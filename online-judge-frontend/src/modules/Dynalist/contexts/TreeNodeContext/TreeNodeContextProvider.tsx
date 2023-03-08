import { FC, ReactNode, useState } from "react";
import { TreeNodeContext } from "./context";
import { getChangesForNodeAddition } from "./helpers/get-changes-for-node-addition";
import {
  IdToTreeNodeMap,
  TreeNodeAdditionParameter,
  TreeNodeChange,
  TreeNodeChangeType,
} from "./interfaces";

interface TreeNodeContextProviderProps {
  children?: ReactNode;
}

export const FlattenTreeContextProvider: FC<TreeNodeContextProviderProps> = ({
  children,
}) => {
  const [idToTreeNodeMap, setIdToTreeNodeMap] = useState<IdToTreeNodeMap>({
    0: { id: 0, parentId: -1, index: 0, childrenIds: [1, 4] },
    1: { id: 1, parentId: 0, index: 0, childrenIds: [2, 3] },
    2: { id: 2, parentId: 1, index: 0, childrenIds: [] },
    3: { id: 3, parentId: 1, index: 1, childrenIds: [] },
    4: { id: 4, parentId: 0, index: 1, childrenIds: [] },
  });

  const applyChanges = (changes: TreeNodeChange[]) => {
    setIdToTreeNodeMap((oldIdToTreeNodeMap) => {
      const newIdToTreeNodeMap = { ...oldIdToTreeNodeMap };

      // Apply deletion first
      changes.forEach((change) => {
        if (change.type === TreeNodeChangeType.DELETION) {
          delete newIdToTreeNodeMap[change.node.id];
        }
      });

      // Then addition
      changes.forEach((change) => {
        if (change.type === TreeNodeChangeType.ADDITION) {
          newIdToTreeNodeMap[change.node.id] = change.node;
        }
      });

      return newIdToTreeNodeMap;
    });
  };

  const addTreeNode = (additionParameter: TreeNodeAdditionParameter) => {
    const changes = getChangesForNodeAddition(
      idToTreeNodeMap,
      additionParameter
    );

    applyChanges(changes);
  };

  return (
    <TreeNodeContext.Provider value={{ idToTreeNodeMap, addTreeNode }}>
      {children}
    </TreeNodeContext.Provider>
  );
};
