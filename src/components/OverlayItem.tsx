import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { itemsSelector } from "../modules/itemsSlice";
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
        border: "2px dashed gray",
        opacity: 0.5,
      }}
    ></Box>
  );
};

export const OverLayItem: React.FC = () => {
  const { id, height, width } = useSelector(
    (state: RootState) => state.page.activeElementProperty
  );

  const itemIds = useSelector(itemsSelector.selectIds).map((id) =>
    id.toString()
  );

  if (id && itemIds.includes(id)) {
    return (
      <Transparent
        height={height ? `${height}px` : undefined}
        width={width ? `${width}px` : undefined}
      />
    );
  }
  return null;
};
