import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const TransformText = ({ text = "", delay = 0 }) => {
  const cont = useRef(null);
  const isInView = useInView(cont, {
    once: true,
    margin: "0%",
  });

  return (
    <motion.div
      ref={cont}
      className="align-middle inline overflow-hidden"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: (i = 1) => ({
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay * i,
          },
        }),
      }}
      initial="hidden"
      animate={isInView ? "visible" : ""}
    >
      {text.split("").map((letter, i) => (
        <motion.span key={i} className="inline-flex whitespace-nowrap">
          <motion.span className={`overflow-hidden inline-block`}>
            <motion.span
              className="inline-block leading-[1.2]"
              variants={{
                hidden: {
                  y: "100%",
                  transition: {
                    duration: 0.6,
                    ease: [0.5, 1, 0.89, 1],
                  },
                },
                visible: {
                  y:0,
                  transition: {
                    duration: 0.6,
                    ease: [0.5, 1, 0.89, 1],
                  },
                },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TransformText;
