import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { Ground, GROUND_DROPPABLE_ID, GROUND_LINE_ID } from "./Ground";
import { SideBar } from "./Sidebar";
import { lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContents, setLineContents] = useRecoilState(
    lineContentState(GROUND_LINE_ID)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === GROUND_DROPPABLE_ID) {
      if (event.active.id) {
        setLineContents([
          ...lineContents,
          {
            lineId: event.active.id.toString(),
            lineType: "normal",
          },
        ]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Flex gap="12">
        <SideBar />
        <Ground />
      </Flex>
    </DndContext>
  );
};
