import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ErrorPage from "./pages/404";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PublicHeader from "./components/PublicHeader";
import StockDetailPage from "./pages/StockDetailPage";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={withPublicRoot(<LoginPage />)} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />

      <Route element={<PrivateRoutes />}>
        <Route exact path="/" element={withRoot(<HomePage />)} />
        <Route
          exact
          path="/stock-detail/:id"
          element={withRoot(<StockDetailPage />)}
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
const withRoot = (Component) => (
  <div className="min-h-screen bg-lmsWhite2 w-full">
    <Header />
    <div className="mx-auto max-w-full mb-16">{Component}</div>
  </div>
);
const withPublicRoot = (Component) => (
  <div className="min-h-screen bg-lmsWhite2 w-full">
    <PublicHeader />
    <div className="mx-auto max-w-full pt-16 mb-16">{Component}</div>
  </div>
);
export default App;
