import { Center, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/store";

type Props = {
  height?: string | undefined;
  width?: string | undefined;
};

const Component: React.FC<Props> = ({ height = "56px", width = "200px" }) => {
  return (
    <Center p="4" w={width} h={height} bg="teal.50">
      <Text>PlaceHolder</Text>
    </Center>
  );
};

export const PlaceHolder: React.FC<{}> = () => {
  const { height, width } = useSelector(
    (state: RootState) => state.page.activeElementProperty
  );
  return <Component height={height} width={width} />;
};
