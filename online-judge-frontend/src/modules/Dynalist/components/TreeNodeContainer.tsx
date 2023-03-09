import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTreeNodeContext } from "../contexts/TreeNodeContext";

interface TreeNodeContainerProps {
  nodeId: string;
  index: number;
}

export const TreeNodeContainer: FC<TreeNodeContainerProps> = ({
  nodeId,
  index,
}) => {
  const { idToTreeNodeMap, addTreeNode } = useTreeNodeContext();
  const node = idToTreeNodeMap[nodeId];

  return (
    <Box sx={{ mt: 1 }}>
      <Paper elevation={2} sx={{ display: "inline-block", padding: 2 }}>
        <Typography variant="body1">ID: {node.id}</Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => addTreeNode({ parentId: node.parentId, index })}
          >
            Add above
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              addTreeNode({ parentId: node.parentId, index: index + 1 })
            }
          >
            Add below
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              addTreeNode({ parentId: node.id, index: node.childrenIds.length })
            }
          >
            Add child
          </Button>
          <Button size="small" variant="contained" color="warning">
            Delete
          </Button>
        </Stack>
      </Paper>
      {node.childrenIds.length > 0 && (
        <Box sx={{ ml: 8 }}>
          {node.childrenIds.map((nodeId, idx) => (
            <TreeNodeContainer key={idx} nodeId={nodeId} index={idx} />
          ))}
        </Box>
      )}
    </Box>
  );
};
