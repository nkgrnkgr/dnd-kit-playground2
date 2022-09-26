import { Icon } from "@chakra-ui/react";
import { FaGripLinesVertical } from "react-icons/fa";

export const DragHandler: React.FC = () => {
  return (
    <Icon
      sx={{
        mr: "4px",
      }}
      as={FaGripLinesVertical}
    />
  );
};
