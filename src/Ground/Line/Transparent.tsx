import { Box } from "@chakra-ui/react";

type Props = {
  //
};

export const Transparent: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        w: "200px",
        h: "56px",
        backgroundColor: "white",
        border: "1px dashed gray",
        opacity: 0.5,
      }}
    ></Box>
  );
};
