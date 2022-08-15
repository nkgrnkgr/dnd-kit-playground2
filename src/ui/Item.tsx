import { Center } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  bgColor: string;
};

export const Item: React.FC<Props> = ({ children, bgColor }) => {
  return (
    <Center p="4" w="200px" bg={bgColor}>
      {children}
    </Center>
  );
};
