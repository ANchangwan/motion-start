import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  place-items: center;
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
  place-items: center;
`;

const Box = styled(motion.div)`
  height: 100px;
  width: 100px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    transform-origin: bottom left;
  }
  &:last-child {
    transform-origin: bottom right;
  }
`;

const Overlay = styled(motion.div)`
  height: 100%;
  width: 100%;
  opacity: 0.3;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const rowVariants = {
  start: { x: window.innerWidth + 10 },
  end: { x: 0 },
  exit: { x: -window.innerWidth - 10 },
};

const boxVariants = {
  hover: {
    scale: 1.3,
  },
};

const exitVariant = {
  start: { opcity: 1 },
  exit: { opacity: 0 },
};

function Home() {
  const offset = 6;

  const arr = Array.from({ length: 20 }, (v, i) => i + 1);
  const [leaving, setToggleLeaving] = useState(false);
  const [seletedId, setSeletedId] = useState("");
  const [page, setPage] = useState(0);

  const onClick = () => {
    if (leaving) return;
    setToggleLeaving(true);
    const total = arr.length;
    const maxIndex = Math.floor(total / offset) - 1;
    setPage((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const onClickBox = (id: string) => {
    console.log(typeof id);
    setSeletedId(id + "");
  };

  const toggle = () => setToggleLeaving((prev) => !prev);
  return (
    <Wrapper onClick={onClick}>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggle}>
          <Row
            variants={rowVariants}
            initial="start"
            animate="end"
            exit="exit"
            key={page}
            transition={{
              type: "tween",
              duration: 1,
            }}
          >
            {arr.slice(page * offset, page * offset + offset).map((v) => (
              <Box
                layoutId={v + ""}
                onClick={() => onClickBox(v)}
                variants={boxVariants}
                whileHover="hover"
                key={v}
              >
                {v}
              </Box>
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {seletedId ? (
          <Overlay
            variants={exitVariant}
            animate="start"
            exit="exit"
            layoutId={seletedId}
          ></Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Home;
