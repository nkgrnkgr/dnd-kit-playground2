import { Center, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/store";

export const PlaceHolder: React.FC<{}> = () => {
  const { height, width } = useSelector(
    (state: RootState) => state.page.activeElementProperty
  );
  return (
    <Center
      p="4"
      w={width ? `${width}px` : undefined}
      h={height ? `${height}px` : undefined}
      bg="teal.50"
    >
      <Text>PlaceHolder</Text>
    </Center>
  );
};
