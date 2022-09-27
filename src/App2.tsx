import { Box, Center, Container } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { assertValue } from "./lib/asserts";
import { SortableItem } from "./SortableItem";

type ItemProps = {
  id: string;
  width: number;
  height: number;
};

const Item: React.FC<ItemProps> = ({ id, width, height }) => {
  return (
    <SortableItem id={id}>
      <Center bgColor={"tomato"} width={width} height={height}>
        {id}
      </Center>
    </SortableItem>
  );
};

type ItemContent = {
  id: string;
  width: number;
  height: number;
};

const ITEMS: ItemContent[] = [
  {
    id: "1",
    width: 200,
    height: 300,
  },
  {
    id: "2",
    width: 300,
    height: 100,
  },
  {
    id: "3",
    width: 100,
    height: 200,
  },
  {
    id: "4",
    width: 400,
    height: 400,
  },
];
export const App: React.FC = () => {
  const [items, setItems] = useState(ITEMS);
  const [activeItem, setActiveItem] = useState<ItemContent | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    const activeItem = items.find((item) => item.id === e.active.id);
    assertValue(activeItem);
    setActiveItem(activeItem);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over) {
      const activeId = e.active.id;
      const overId = e.over.id;
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const overIndex = items.findIndex((item) => item.id === overId);

      const sorted = arrayMove(items, activeIndex, overIndex);
      setItems(sorted);
    }
    setActiveItem(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container
        sx={{
          m: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={items.map((item) => item.id)}
          >
            {items.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                width={item.width}
                height={item.height}
              />
            ))}
            <DragOverlay>
              {activeItem && (
                <Box
                  sx={{
                    opacity: "0.8",
                  }}
                >
                  <Item
                    id={activeItem.id}
                    width={activeItem.width}
                    height={activeItem.height}
                  />
                </Box>
              )}
            </DragOverlay>
          </SortableContext>
        </Box>
      </Container>
    </DndContext>
  );
};
