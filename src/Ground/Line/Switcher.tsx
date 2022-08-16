import { LineContent } from "../../store/line";
import { LineItem } from "./LineItem";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  lineContent: LineContent;
};

export const Switcher: React.FC<Props> = ({ lineContent }) => {
  const { lineId, lineType } = lineContent;

  switch (lineType) {
    case "normal": {
      return <LineItem itemId={lineId} />;
    }
    case "placeholder": {
      return <PlaceHolder />;
    }
    default: {
      throw new Error();
    }
  }
};
