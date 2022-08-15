import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  droppableId: string;
};

export const Droppable: React.FC<Props> = ({ children, droppableId }) => {
  const { setNodeRef } = useDroppable({
    id: droppableId,
  });

  return <div ref={setNodeRef}>{children}</div>;
};
