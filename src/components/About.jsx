import React from "react";
//import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
//import { service } from "../constants";
import { fadeIn, textVariant } from '../utils/motion';


const About = () => {
  return (
    <>
    <motion.p>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[20px] max-w-3xl leading-[30px]"
      />
      I'ma wew develper
      </motion.p>
    </>
  )
};

export default About;
