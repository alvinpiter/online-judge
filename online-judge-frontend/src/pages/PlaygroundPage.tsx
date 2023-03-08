import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { TreeNodeContainer } from "../modules/Dynalist/components/TreeNodeContainer";
import {
  TreeNodeContextProvider,
  useTreeNodeContext,
} from "../modules/Dynalist/contexts/TreeNodeContext";

export const PlaygroundPage: FC = () => {
  return (
    <TreeNodeContextProvider>
      <Typography variant="h4"> Playground </Typography>

      <Box sx={{ mt: 2 }}>
        <PlaygroundPageContent />
      </Box>
    </TreeNodeContextProvider>
  );
};

export const PlaygroundPageContent = () => {
  const { idToTreeNodeMap } = useTreeNodeContext();
  const rootNodesSortedByIndex = Object.values(idToTreeNodeMap)
    .filter((node) => node.parentId === 0)
    .sort((node1, node2) => node1.index - node2.index);

  return (
    <>
      {rootNodesSortedByIndex.map((node) => (
        <TreeNodeContainer nodeId={node.id} />
      ))}
    </>
  );
};
