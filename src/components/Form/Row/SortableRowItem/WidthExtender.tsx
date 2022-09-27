import { Icon } from "@chakra-ui/react";
import { DndContext, DragMoveEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { FaGripLinesVertical } from "react-icons/fa";
import { CenterComponent } from "../../../helper/Center";
import { Draggable } from "../../../helper/dnd/Draggable";

type Props = {
  id: string;
  height: string;
};

export const WidthExtender: React.FC<Props> = ({ id, height }) => {
  const handleDragMove = (e: DragMoveEvent) => {
    console.log(e.delta);
  };
  return (
    <DndContext
      onDragMove={handleDragMove}
      modifiers={[restrictToHorizontalAxis]}
    >
      <Draggable id={`edge-${id}`}>
        <CenterComponent backgroundColor="blue.400" height={height} width="10">
          <Icon
            color="#fff"
            aria-label="dragHandler"
            as={FaGripLinesVertical}
          />
        </CenterComponent>
      </Draggable>
    </DndContext>
  );
};
