import { GridItemType } from "./../../types/GridItemType";
import * as C from "./style";
import baby from "./../../svgs/baby.svg";
import { items } from "../../data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShow || item.show}
      onClick={onClick}
    >
      {item.permanentShow === false && item.show === false && (
        <C.Icon src={baby} alt="" opacity={0.2} />
      )}
      {(item.permanentShow || item.show) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt="" />
      )}
    </C.Container>
  );
};
