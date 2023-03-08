import { FC, ReactNode, useState } from "react";
import { TreeNodeContext } from "./context";
import { IdToTreeNodeMap } from "./interfaces";

interface TreeNodeContextProviderProps {
  children?: ReactNode;
}

export const FlattenTreeContextProvider: FC<TreeNodeContextProviderProps> = ({
  children,
}) => {
  const [idToTreeNodeMap] = useState<IdToTreeNodeMap>({
    1: { id: 1, parentId: 0, index: 0, childrenIds: [2, 3] },
    2: { id: 2, parentId: 1, index: 0, childrenIds: [] },
    3: { id: 3, parentId: 1, index: 1, childrenIds: [] },
    4: { id: 4, parentId: 0, index: 1, childrenIds: [] },
  });

  return (
    <TreeNodeContext.Provider value={{ idToTreeNodeMap }}>
      {children}
    </TreeNodeContext.Provider>
  );
};
