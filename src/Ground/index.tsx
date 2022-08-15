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
    <Box
      sx={{
        bgColor: "gray.100",
        p: "12px",
        h: "100vh",
        minWidth: "900px",
      }}
    >
      <Droppable droppableId={GROUND_DROPPABLE_ID}>
        <Line lineId={GROUND_LINE_ID} />
      </Droppable>
    </Box>
  );
};
