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

export const TreeNodeContextProvider: FC<TreeNodeContextProviderProps> = ({
  children,
}) => {
  const [idToTreeNodeMap, setIdToTreeNodeMap] = useState<IdToTreeNodeMap>({
    root: { id: "root", parentId: "", childrenIds: ["abcde"] },
    abcde: { id: "abcde", parentId: "root", childrenIds: [] },
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
