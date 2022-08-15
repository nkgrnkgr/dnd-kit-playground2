import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { Ground, GROUND_DROPPABLE_ID, GROUND_LINE_ID } from "./Ground";
import { SideBar } from "./Sidebar";
import { lineIdsState } from "./store/line";

export const App: React.FC = () => {
  const [lineIds, setLineIds] = useRecoilState(lineIdsState(GROUND_LINE_ID));

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === GROUND_DROPPABLE_ID) {
      if (event.active.id) {
        setLineIds([...lineIds, event.active.id.toString()]);
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
