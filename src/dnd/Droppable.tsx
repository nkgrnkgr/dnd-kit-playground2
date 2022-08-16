import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  droppableId: string;
  style?: React.CSSProperties;
};

export const Droppable: React.FC<Props> = ({
  children,
  droppableId,
  style,
}) => {
  const { setNodeRef } = useDroppable({
    id: droppableId,
  });

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
