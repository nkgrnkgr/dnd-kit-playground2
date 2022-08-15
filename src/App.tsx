import { Flex } from "@chakra-ui/react";
import { SideBar } from "./Sidebar";

export const App: React.FC = () => {
  return (
    <Flex gap="12">
      <SideBar />
    </Flex>
  );
};
