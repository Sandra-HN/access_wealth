import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { API } from "../api";
import { getSYS_CURToken, getToken } from "../utils/common";

const TransactionTable = ({
  portfolioValuation,
  showTransaction,
  selectedValuation,
}) => {
  const [TABLE_HEAD, setTABLE_HEAD] = useState([
    "#",
    "Trade Date",
    "Trx. Type",
    "Security Name",
    "Qty",
    "Sec. Currency",
    "Price (Sec. Cur)",
    "Net Amount (Sec. Cur)",
    "Sel. Currency",
    "Price (Sel. Cur)",
    "Net Amount (Sel. Cur)",
  ]);
  const [pagination, setPagination] = useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  useEffect(() => {
    if (selectedValuation) {
      console.log(selectedValuation);
      gettransactiondetals();
    }
  }, [selectedValuation, getSYS_CURToken()]);
  const gettransactiondetals = async () => {
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)(
      `/api/transactions/search?securityIds=${
        selectedValuation?.security?.id
      }&portfolioIds=${
        portfolioValuation?.portfolio?.id
      }&currencyCode=${getSYS_CURToken()}`
    );
    console.log(response);
    setTABLE_ROWS(response.content);
    setPagination(response);
  };
  const getpages = (pt) => {
    for (let index = 0; index < pt; index++) {
      return (
        <IconButton variant="text" color="white" size="sm">
          {index + 1}
        </IconButton>
      );
    }
  };
  return (
    <div
      className={`my-12 bg-black-100 rounded-[20px] ${
        showTransaction ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>
            These are details about the last transactions
          </p>
          <h2 className={styles.sectionHeadText}>Transaction History</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        <Card
          className={`h-full w-full violet-gradient backdrop-blur-sm rounded-2xl px-6 md:px-16 min-h-[300px]`}
        >
          {/* <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none m-0 bg-blue-gray-50/50 "
          >
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <Button
                  className="flex items-center gap-3"
                  color="blue"
                  size="sm"
                >
                  <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                  Download
                </Button>
              </div>
            </div>
          </CardHeader> */}
          <CardBody className="overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    {
                      id,
                      tradeDate,
                      trxType,
                      security,
                      trxCurrencyCode,
                      price,
                      qty,
                      grossAmount,
                      netAmount,
                      securityCurrencyCode,
                      priceInSecurityCurrency,
                      grossAmountInSecurityCurrency,
                      totalChargesInSecurityCurrency,
                      netAmountInSecurityCurrency,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-bold"
                            >
                              {id}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {tradeDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {trxType}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {security?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {qty}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {securityCurrencyCode}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {parseFloat(priceInSecurityCurrency).toFixed(3)}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {parseFloat(grossAmountInSecurityCurrency).toFixed(
                              3
                            )}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {trxCurrencyCode}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {parseFloat(price).toFixed(3)}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {parseFloat(grossAmount).toFixed(3)}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              disabled={pagination?.first}
              variant="outlined"
              color="white"
              size="sm"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {pagination && getpages(pagination.totalPages)}
            </div>
            <Button
              disabled={pagination?.last}
              variant="outlined"
              color="white"
              size="sm"
            >
              Next
            </Button>
          </CardFooter>
        </Card>
        {/* {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))} */}
      </div>
    </div>
  );
};

export default TransactionTable;
