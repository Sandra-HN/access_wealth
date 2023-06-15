import React, { Fragment, useEffect, useState } from "react";

import {
  SecurityValuations,
  Hero,
  SecurityChart,
  TransactionTable,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getSYS_CURToken,
  getUserToken,
  setSYS_CURToken,
} from "../utils/common";
import {
  getPortfolioValuationAction,
  logoutClickAction,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const portfolioValuation = useSelector((state) => state.portfolio.valuation);
  const portfolioValuationLoading = useSelector(
    (state) => state.portfolio.valuationloading
  );
  const [investor, setInvestor] = useState(null);
  const [securityValuations, setSecurityValuations] = useState([]);
  const [securityTimeSeries, setSecurityTimeSeries] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedValuation, setSelectedValuation] = useState(null);
  useEffect(() => {
    if (getUserToken()) {
      dispatch(getPortfolioValuationAction(navigate));
    } else {
      dispatch(logoutClickAction(navigate));
    }
  }, []);

  useEffect(() => {
    if (portfolioValuation) {
      setInvestor(portfolioValuation.portfolio.investor);
      setSYS_CURToken(portfolioValuation.currencyCode);
      setSecurityValuations(portfolioValuation.securityValuations);
      setSecurityTimeSeries(portfolioValuation.securityTimeSeries);
    }
  }, [portfolioValuation]);

  return (
    <Fragment>
      <Hero investor={investor} portfolioValuation={portfolioValuation} />

      <SecurityValuations
        securityValuations={securityValuations}
        setShowTransaction={setShowTransaction}
        setSelectedValuation={setSelectedValuation}
        navigate={navigate}
        fromHome={true}
      />

      <TransactionTable
        portfolioValuation={portfolioValuation}
        showTransaction={showTransaction}
        selectedValuation={selectedValuation}
      />

      <SecurityChart securityTimeSeries={securityTimeSeries} />
      <Footer />
    </Fragment>
  );
}

export default HomePage;
