import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { useSelector } from "react-redux";
import { getSYS_CURToken } from "../utils/common";
import { ComputersCanvas } from "./canvas";
const Hero = ({ investor, portfolioValuation }) => {
  const portfolioValuationLoading = useSelector(
    (state) => state.portfolio.valuationloading
  );

  return (
    <section
      className={`relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center`}
    >
      <div
        className={`absolute inset-0 top-[80px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-viol" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Portfolio <span className="text-viol">Valuation</span>
          </h1>

          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`${styles.padding} max-w-7xl  relative z-0`}
          >
            <div>
              <motion.div variants={textVariant()}>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className={styles.sectionSubText}
                >
                  Investor Name:
                </motion.p>
                <h2 className={styles.sectionHeadText}>{investor?.name}</h2>
              </motion.div>

              <motion.div variants={textVariant()}>
                <motion.p
                  variants={fadeIn("", "", 0.2, 1)}
                  className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
                >
                  Investor Account Currency
                </motion.p>
                <p className="text-white font-black md:text-[20px] sm:text-[20px] xs:text-[20px] text-[20px]">
                  {investor?.currencyCode}
                </p>
              </motion.div>
              <motion.div variants={textVariant()}>
                <motion.p
                  variants={fadeIn("", "", 0.3, 1)}
                  className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
                >
                  Valuation Currency:
                </motion.p>
                <p className="text-white font-black md:text-[20px] sm:text-[20px] xs:text-[20px] text-[20px]">
                  {portfolioValuation?.currencyCode}
                </p>
              </motion.div>
              <motion.div variants={textVariant()}>
                <motion.p
                  variants={fadeIn("", "", 0.4, 1)}
                  className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
                >
                  Portfolio Value:
                </motion.p>
                <p className="text-white font-black md:text-[20px] sm:text-[20px] xs:text-[20px] text-[20px]">
                  {parseFloat(portfolioValuation?.marketValue).toFixed(3)}
                </p>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
