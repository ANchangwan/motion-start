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
`;

const boxVariants = {
  start: { x: window.innerWidth + 10 },
  end: { x: 0 },
  exit: { x: -window.innerWidth - 10 },
};

function Home() {
  const offset = 6;

  const arr = Array.from({ length: 20 }, (v, i) => i + 1);
  const [leaving, setToggleLeaving] = useState(false);
  const [page, setPage] = useState(0);

  const onClick = () => {
    if (leaving) {
      setToggleLeaving(false);
      return;
    }

    const total = arr.length;
    const maxIndex = Math.floor(total / offset) - 1;
    setPage((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  return (
    <Wrapper onClick={onClick}>
      <Slider>
        <AnimatePresence initial={false}>
          <Row
            variants={boxVariants}
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
              <Box key={v}>{v}</Box>
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </Wrapper>
  );
}

export default Home;
