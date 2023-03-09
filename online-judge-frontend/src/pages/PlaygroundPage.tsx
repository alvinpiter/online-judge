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
  const rootNode = idToTreeNodeMap["root"];

  return (
    <>
      {rootNode.childrenIds.map((childrenId, idx) => (
        <TreeNodeContainer key={idx} nodeId={childrenId} index={idx} />
      ))}
    </>
  );
};
