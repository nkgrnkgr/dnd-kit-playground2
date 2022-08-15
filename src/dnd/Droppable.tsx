import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  droppableId: string;
};

export const Droppable: React.FC<Props> = ({ children, droppableId }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
