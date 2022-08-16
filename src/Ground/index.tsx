import { Box } from "@chakra-ui/react";
import { Line } from "./Line";

type Props = {
  //
};

export const Ground: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        bgColor: "gray.100",
        p: "12px",
        h: "100vh",
        minWidth: "900px",
      }}
    >
      <Line lineId="line1" />
    </Box>
  );
};
