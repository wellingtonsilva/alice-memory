import { useEffect, useState } from "react";
import * as C from "./App.styles";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";
import { GridItem } from "./components/GridItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moviCount, setMoviCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verificar se os abertos são iguais
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.show === true);
      if (opened.length === 2) {
        // se eles são iguais tornalos permanentShow

        if (opened[0].item === opened[1].item) {
          let gridTemp = [...gridItems];
          for (let i in gridTemp) {
            if (gridTemp[i].show) {
              gridTemp[i].permanentShow = true;
              gridTemp[i].show = false;
            }
          }
          setGridItems(gridTemp);
          setShowCount(0);
        } else {
          // se não são iguas fecham os dois

          setTimeout(() => {
            let gridTemp = [...gridItems];
            for (let i in gridTemp) {
              gridTemp[i].show = false;
            }
            setGridItems(gridTemp);
            setShowCount(0);
          }, 1000);
        }

        setMoviCount((moviCount) => moviCount + 1);
      }
    }
  }, [showCount, gridItems]);

  // verificar se o jogo acabou
  useEffect(() => {
    if (
      moviCount > 0 &&
      gridItems.every((item) => item.permanentShow === true)
    ) {
      setPlaying(false);
    }
  }, [moviCount, gridItems]);

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo;
    setTimeElapsed(0);
    setMoviCount(0);
    setShowCount(0);

    // passo 2 - criar o grid
    // passo 2.1  criar um grid vazio
    let gridTemp: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      gridTemp.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }
    // 2.2 preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || gridTemp[pos].item !== null) {
          pos = Math.floor(Math.random() * items.length * 2);
        }
        gridTemp[pos].item = i;
      }
    }

    //2.3 jogar no state
    setGridItems(gridTemp);

    //passo 3 - começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let gridTemp = [...gridItems];

      if (
        gridTemp[index].permanentShow === false &&
        gridTemp[index].show === false
      ) {
        gridTemp[index].show = true;
        setShowCount(showCount + 1);
      }

      setGridItems(gridTemp);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>Alice Memory</C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moviCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          //icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
