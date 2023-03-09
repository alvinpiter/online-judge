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
  const { idToTreeNodeMap, changesList } = useTreeNodeContext();
  const rootNode = idToTreeNodeMap["root"];

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 2 }}>
        {rootNode.childrenIds.map((childrenId, idx) => (
          <TreeNodeContainer key={idx} nodeId={childrenId} index={idx} />
        ))}
      </Box>

      <Box sx={{ flex: 1 }}>
        <pre>{JSON.stringify({ changes: changesList }, null, 4)}</pre>
      </Box>
    </Box>
  );
};
