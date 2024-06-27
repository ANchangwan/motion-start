import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  start: { x: window.outerWidth },
  end: { x: 0 },
  exit: { x: -window.outerWidth / 2 },
};

function Home() {
  const offset = 6;

  const arr = Array.from({ length: 20 }, (v, i) => i + 1);
  const [leaving, setToggleLeaving] = useState(false);
  const [page, setPage] = useState(0);

  const boxVariants = {
    start: { x: window.innerWidth - 600 },
    end: { x: 0 },
    exit: { x: -window.innerWidth + 600 },
  };

  const onClick = () => {
    // if (leaving) return;
    //
    const total = arr.length;
    const maxIndex = Math.floor(total / offset) - 1;
    setPage((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeavig = () => setToggleLeaving((prev) => !prev);
  return (
    <Wrapper onClick={onClick}>
      <AnimatePresence initial={false} onExitComplete={toggleLeavig}>
        {arr.slice(page * offset, page * offset + offset).map((v) => (
          <Box
            key={v}
            variants={boxVariants}
            initial="start"
            animate="end"
            exit="exit"
            transition={{
              type: "tween",
              duration: 1,
              ease: "linear",
            }}
          >
            {v}
          </Box>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Home;
