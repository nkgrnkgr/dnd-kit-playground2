import { Center } from "@chakra-ui/react";

type Props = {
  backgroundColor: string;
  width: string;
  height: string;
  children: React.ReactNode;
};

export const CenterComponent: React.FC<Props> = ({
  backgroundColor,
  width,
  height,
  children,
}) => {
  return (
    <Center bgColor={backgroundColor} h={height} w={width}>
      {children}
    </Center>
  );
};
