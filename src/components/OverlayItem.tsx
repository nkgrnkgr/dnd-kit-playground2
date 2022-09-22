import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SortableItem } from "../dnd/SortableItem";
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

type Props = {
  itemId: string;
};

export const OverLayItem: React.FC<Props> = ({ itemId }) => {
  const { height, width } = useSelector(
    (state: RootState) => state.page.activeElementProperty
  );

  return (
    <SortableItem itemId={itemId}>
      <Transparent height={height} width={width} />
    </SortableItem>
  );
};
