import { Box } from "@chakra-ui/react";

type Props = {
  width?: number;
  height?: number;
};

export const Transparent: React.FC<Props> = ({ width = 200, height = 56 }) => {
  return (
    <Box
      sx={{
        w: `${width}px`,
        h: `${height}px`,
        backgroundColor: "white",
        border: "1px dashed gray",
        opacity: 0.5,
      }}
    ></Box>
  );
};
