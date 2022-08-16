import { Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { lineContentState } from "../../store/line";
import { EmptyLine } from "./EmptyLine";
import { Switcher } from "./Switcher";

type Props = {
  lineId: string;
};

export const Line: React.FC<Props> = ({ lineId }) => {
  const [lineContents] = useRecoilState(lineContentState(`${lineId}`));

  return (
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      {lineContents.map((content, index) => (
        <Switcher key={index} lineContent={content} />
      ))}
      <EmptyLine />
    </Flex>
  );
};
