import { Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { Ground } from "./Ground";
import { EMPTY_LINE_ID } from "./Ground/Line/EmptyLine";
import { createDroppableItemId } from "./Ground/Line/LineItem";
import { SideBar } from "./Sidebar";
import { lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContents, setLineContents] = useRecoilState(
    lineContentState("line1")
  );

  const droppableIds = [
    EMPTY_LINE_ID,
    ...lineContents.map((c) => createDroppableItemId(c.lineId)),
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      if (event.active.id) {
        // 追加 or 移動の判定
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
