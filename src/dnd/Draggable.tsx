import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Item } from "../modules/itemsSlice";

type Props = {
  children: React.ReactNode;
  itemId: string;
  type: Item["type"];
};

export const Draggable: React.FC<Props> = ({ children, itemId, type }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemId,
    data: {
      type,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
