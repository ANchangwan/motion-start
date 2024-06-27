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
  start: { x: window.outerWidth + 10 },
  end: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};

function Home() {
  const offset = 6;

  const arr = Array.from({ length: 20 }, (v, i) => i + 1);
  const [Leaving, setLeaving] = useState(false);
  const [leaving, setToggleLeaving] = useState(false);

  const [page, setPage] = useState(1);

  const onClick = () => {
    if (leaving) return;
    const total = arr.length;
    const maxIndex = Math.floor(total / offset) - 1;
    setPage((prev) => (prev === 4 ? 0 : prev + 1));
  };
  const toggleLeavig = () => setLeaving((prev) => !prev);
  return (
    <Wrapper onClick={onClick}>
      <AnimatePresence initial={false} onExitComplete={toggleLeavig}>
        {arr.slice((page - 1) * offset, page * offset).map((v) => (
          <Box
            key={v}
            variants={boxVariants}
            initial="false"
            animate="end"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
          >
            {v}
          </Box>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Home;
