import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../modules/store";

type TransparentProps = {
  width?: string;
  height?: string;
};

const Transparent: React.FC<TransparentProps> = ({
  width = "200px",
  height = "56px",
}) => {
  return (
    <Box
      sx={{
        w: width,
        h: height,
        backgroundColor: "white",
        border: "1px dashed gray",
        opacity: 0.5,
      }}
    ></Box>
  );
};

export const OverLayItem: React.FC = () => {
  const { id, height, width } = useSelector(
    (state: RootState) => state.page.activeElementProperty
  );

  if (!id) {
    return null;
  }

  return <Transparent height={height} width={width} />;
};
