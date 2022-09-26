import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  droppableId: string;
  rowId: string;
  style?: React.CSSProperties;
};

export const Droppable: React.FC<Props> = ({
  children,
  droppableId,
  rowId,
  style,
}) => {
  const { setNodeRef } = useDroppable({
    id: droppableId,
    data: {
      rowId,
    },
  });

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
