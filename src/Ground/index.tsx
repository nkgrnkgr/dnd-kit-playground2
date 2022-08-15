import { Box } from "@chakra-ui/react";
import { Droppable } from "../dnd/Droppable";
import { Line } from "./Line";

type Props = {
  //
};

export const GROUND_DROPPABLE_ID = "ground-droppable";

export const GROUND_LINE_ID = "ground-line-id";

export const Ground: React.FC<Props> = () => {
  return (
    <Droppable droppableId={GROUND_DROPPABLE_ID}>
      <Box
        sx={{
          bgColor: "gray.100",
          p: "12px",
          h: "100vh",
          minWidth: "900px",
        }}
      >
        <Line lineId={GROUND_LINE_ID} />
      </Box>
    </Droppable>
  );
};
