import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  SecurityValuations,
  Hero,
  SecurityChart,
  TransactionTable,
  GoToTop,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../utils/common";
import alasql from "alasql";
import { getPortfolioValuationAction } from "../redux/portfolio_actions";
function StockDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const portfolioValuation = useSelector((state) => state.portfolio.valuation);
  const portfolioValuationLoading = useSelector(
    (state) => state.portfolio.valuationloading
  );
  const [securityValuations, setSecurityValuations] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [selectedValuation, setSelectedValuation] = useState(null);
  const [securityTimeSeries, setSecurityTimeSeries] = useState([]);
  useEffect(() => {
    if (!getUserToken()) {
      dispatch(logoutClickAction(navigate));
    }
  }, []);
  useEffect(() => {
    if (!portfolioValuation && !portfolioValuationLoading) {
      dispatch(getPortfolioValuationAction(navigate));
    } else {
      if (portfolioValuation) {
        let SV = alasql(
          `SEARCH / as @details WHERE(@details.security.id=${parseInt(
            params.id
          )}) @details FROM ? `,
          [portfolioValuation.securityValuations]
        );

        setSecurityValuations(SV);
        if (SV.length > 0) {
          let ST = alasql(
            `SEARCH / as @details WHERE(@details->key.name = '${SV[0].security.name}') @details FROM ? `,
            [portfolioValuation.securityTimeSeries]
          );

          setSecurityTimeSeries(ST);
        }
      }
    }
  }, [portfolioValuation]);

  return (
    <Fragment>
      <section
        className={`py-12 relative w-full h-fit mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center`}
      >
        <SecurityValuations
          securityValuations={securityValuations}
          setShowTransaction={setShowTransaction}
          setSelectedValuation={setSelectedValuation}
          navigate={navigate}
          fromHome={false}
        />
      </section>

      <TransactionTable
        portfolioValuation={portfolioValuation}
        showTransaction={showTransaction}
        selectedValuation={selectedValuation}
      />

      <SecurityChart securityTimeSeries={securityTimeSeries} />
      <GoToTop />
    </Fragment>
  );
}

export default StockDetailPage;
