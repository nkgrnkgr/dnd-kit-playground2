import { Icon } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { FaGripLinesVertical } from "react-icons/fa";
import { actions } from "../../../../modules/itemsSlice";
import { useRootDispatch } from "../../../../modules/store";
import { CenterComponent } from "../../../helper/Center";
import { Draggable } from "../../../helper/dnd/Draggable";

type Props = {
  id: string;
  itemWidth: string;
  height: string;
};

export const WidthExtender: React.FC<Props> = ({ id, itemWidth, height }) => {
  const dispatch = useRootDispatch();
  const handleDragEnd = (e: DragEndEvent) => {
    dispatch(
      actions.changeWidth({
        itemId: id,
        width: `${Number(itemWidth) + e.delta.x}`,
      })
    );
  };
  return (
    <DndContext
      onDragEnd={handleDragEnd}
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
