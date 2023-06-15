import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useSelector } from "react-redux";

const SecurityValuationCard = (props) => (
  <Tilt className="xl:w-3/12 lg:w-4/12 md:w-6/12 w-full ">
    <motion.div
      variants={fadeIn("right", "spring", props.index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-6 min-h-[280px] flex justify-evenly items-center flex-col cursor-pointer"
        onClick={async () => {
          debugger;
          if (props.fromHome) {
            props.navigate(
              `/stock-detail/${props.securityValuation?.security?.id}`
            );
          } else {
            await props.setSelectedValuation(props.securityValuation);
            await props.setShowTransaction(true);
          }
        }}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className="text-viol text-lg font-bold text-left">
            {props.securityValuation.security.symbol}
          </h3>
          <img
            src={props.icon}
            alt="web-development"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h2 className="text-white text-xl font-bold text-left w-full">
          {props.securityValuation.security.name}
        </h2>
        <div className="flex flex-col w-full items-center">
          <motion.div
            variants={textVariant()}
            className="flex justify-between w-full"
          >
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className={styles.sectionSubText}
            >
              Market Price
            </motion.p>
            <h2>
              {parseFloat(props.securityValuation.marketPrice).toFixed(3)}
            </h2>
          </motion.div>
          <motion.div
            variants={textVariant()}
            className="flex justify-between w-full"
          >
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className={styles.sectionSubText}
            >
              Net Qty
            </motion.p>
            <h2>{props.securityValuation.units}</h2>
          </motion.div>
          <motion.div
            variants={textVariant()}
            className="flex justify-between w-full"
          >
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className={styles.sectionSubText}
            >
              Market Value
            </motion.p>
            <h2>
              {parseFloat(props.securityValuation.marketValue).toFixed(3)}
            </h2>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const SecurityValuations = ({
  securityValuations,
  setShowTransaction,
  setSelectedValuation,
  navigate,
  fromHome,
}) => {
  const portfolioValuationLoading = useSelector(
    (state) => state.portfolio.valuationloading
  );
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={"about"}>
        &nbsp;
      </span>
      <div className="mt-20 flex flex-wrap  justify-between gap-y-10 gap-0.5">
        {securityValuations?.map((securityValuation, index) => (
          <SecurityValuationCard
            key={index}
            index={index}
            icon={securityValuation.security.logoUrl}
            securityValuation={securityValuation}
            setShowTransaction={setShowTransaction}
            setSelectedValuation={setSelectedValuation}
            navigate={navigate}
            fromHome={fromHome}
          />
        ))}
      </div>
    </motion.section>
  );
};
export default SecurityValuations;
