import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Ground } from "./Ground";
import { SideBar } from "./Sidebar";

export const App: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
      console.log(event.over);
    }
  };

  return (
    <Flex gap="12">
      <DndContext onDragEnd={handleDragEnd}>
        <SideBar />
        <Ground />
      </DndContext>
    </Flex>
  );
};
