import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { Ground } from "./Ground";
import { SideBar } from "./Sidebar";
import { lineIdsState } from "./store/line";

export const App: React.FC = () => {
  const [lineIds, setLineIds] = useRecoilState(lineIdsState("99"));

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable") {
      setLineIds([...lineIds]);
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
