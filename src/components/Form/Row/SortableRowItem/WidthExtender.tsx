import { Center, Icon } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { FaGripLinesVertical } from "react-icons/fa";
import { Draggable } from "../../../helper/dnd/Draggable";

type Props = {
  id: string;
  left: string;
  height: string;
  handleDragMove: (e: DragMoveEvent) => void;
  handleDragEnd: (e: DragEndEvent) => void;
};

export const WidthExtender: React.FC<Props> = ({
  id,
  left,
  height,
  handleDragMove,
  handleDragEnd,
}) => {
  return (
    <>
      <DndContext
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <Draggable id={`edge-${id}`}>
          <Center
            sx={{
              position: "absolute",
              top: "0",
              left,
            }}
            backgroundColor="blue.400"
            height={height}
            width="10"
          >
            <Icon
              color="#fff"
              aria-label="dragHandler"
              as={FaGripLinesVertical}
            />
          </Center>
        </Draggable>
      </DndContext>
    </>
  );
};
