import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id: string;
  data?: Record<string, unknown>;
};

export const Droppable: React.FC<Props> = ({ children, style, id, data }) => {
  const { setNodeRef } = useDroppable({
    id,
    data,
  });

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
