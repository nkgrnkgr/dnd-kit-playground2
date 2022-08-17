import { Center, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { activeElementPropertyState } from "../../store/activeElementProperty";

type Props = {
  height?: number;
  width?: number;
};

const Component: React.FC<Props> = ({ height = 56, width = 200 }) => {
  return (
    <Center p="4" w={`${width}px`} h={`${height}px`} bg="teal.50">
      <Text>PlaceHolder</Text>
    </Center>
  );
};

export const PlaceHolder: React.FC<{}> = () => {
  const { height, width } = useRecoilValue(activeElementPropertyState);
  return <Component height={height} width={width} />;
};
