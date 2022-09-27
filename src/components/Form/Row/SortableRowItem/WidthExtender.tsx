import { Box, Center, Icon } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { actions } from "../../../../modules/itemsSlice";
import { useRootDispatch } from "../../../../modules/store";
import { Draggable } from "../../../helper/dnd/Draggable";

type Props = {
  id: string;
  height: string;
  paddingStartPosition: string;
};

export const WidthExtender: React.FC<Props> = ({
  id,
  paddingStartPosition,
  height,
}) => {
  const [width, setWidth] = useState(0);
  const dispatch = useRootDispatch();

  const handleDragMove = (e: DragMoveEvent) => {
    setWidth(e.delta.x);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    setWidth(0);
    // dispatch(actions.changeWidth({
    //   itemId: id,
    //   width: (Number(paddingStartPosition) + e.delta.x).toString()
    // })
    dispatch(
      actions.changeWidth({
        itemId: id,
        width: `${Number(paddingStartPosition) + e.delta.x}`,
      })
    );
  };

  return (
    <>
      <DndContext
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: paddingStartPosition,
            w: width,
            height,
            background: "blue.400",
          }}
        ></Box>
        <Draggable id={`edge-${id}`}>
          <Center backgroundColor="blue.400" height={height} width="10">
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
