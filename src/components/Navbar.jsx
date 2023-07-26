import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PowerIcon } from "@heroicons/react/24/solid";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, logoutIcon } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  getSYS_CURToken,
  getUserToken,
  removeToken,
  setSYS_CURToken,
} from "../utils/common";
import Select from "react-tailwindcss-select";
import { Typography } from "@material-tailwind/react";
import { getPortfolioValuationAction, logoutAction } from "../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuthUser = useSelector((state) => state.auth.data);
  const AuthUserLoading = useSelector((state) => state.auth.loading);

  const [currency, setCurrency] = useState(null);

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (getSYS_CURToken()) {
      let syscur = getSYS_CURToken();
      setCurrency({
        value: syscur,
        label: syscur,
        isSelected: true,
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-50 ${
        scrolled ? "bg-primary" : "bg-primary/20"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Case Study
          </p>
        </Link>

        <ul className="hidden sm:flex w-6/12  mb-0 mt-0 flex-row items-center justify-end gap-6">
          {navLinks.map((nav) => (
            <Typography
              as="li"
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer w-full`}
              key={nav.id}
              onClick={async () => {
                setActive(nav.title);
                if (nav.id === "logout") {
                  dispatch(logoutAction(navigate));
                }
              }}
            >
              {nav.id === "logout" ? (
                <Typography
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer flex items-center justify-end gap-2 capitalize`}
                >
                  <PowerIcon className="h-5 w-5" />
                </Typography>
              ) : (
                <div>
                  <Select
                    placeholder="System Currency"
                    value={currency}
                    onChange={async (crcy) => {
                      setCurrency(crcy);
                      await setSYS_CURToken(crcy.value);

                      await dispatch(
                        await getPortfolioValuationAction(navigate)
                      );
                    }}
                    options={[
                      {
                        value: "AED",
                        label: "AED",
                        isSelected: currency === "AED",
                      },
                      {
                        value: "USD",
                        label: "USD",
                        isSelected: currency === "USD",
                      },
                    ]}
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `flex justify-between bg-tertiary ${
                          isDisabled ? "text-secondary" : "text-white"
                        } w-full px-6   border border-white rounded-xl`,
                      // listGroupLabel:"block text-green",
                      listItem: ({ isSelected }) =>
                        `py-2 px-6 rounded ${
                          isSelected ? "bg-white/30" : "tertiary-transparent"
                        } hover:bg-white/60`,
                      menu: "absolute right-0 bg-tertiary/50 rounded border w-full ",
                      // list: "bg-tertiary max-h-96 overflow-auto",
                      // listGroupLabel: "bg-black",
                    }}
                  />
                </div>
              )}
            </Typography>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-5 w-5 sm:w-[28px] sm:h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <Typography
                  as="li"
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer w-full`}
                  key={nav.id}
                  onClick={async () => {
                    setActive(nav.title);
                    if (nav.id === "logout") {
                      dispatch(logoutAction(navigate));
                    }
                  }}
                >
                  {nav.id === "logout" ? (
                    <Typography
                      className={`${
                        active === nav.title ? "text-white" : "text-secondary"
                      } hover:text-white text-[18px] font-medium cursor-pointer flex items-center justify-center gap-2 capitalize`}
                    >
                      <PowerIcon className="h-7 w-7" />
                    </Typography>
                  ) : (
                    <div>
                      <Select
                        placeholder="System Currency"
                        value={currency}
                        onChange={async (crcy) => {
                          setCurrency(crcy);
                          await setSYS_CURToken(crcy.value);

                          await dispatch(
                            await getPortfolioValuationAction(navigate)
                          );
                        }}
                        options={[
                          {
                            value: "AED",
                            label: "AED",
                            isSelected: currency === "AED",
                          },
                          {
                            value: "USD",
                            label: "USD",
                            isSelected: currency === "USD",
                          },
                        ]}
                        classNames={{
                          menuButton: ({ isDisabled }) =>
                            `flex justify-between bg-tertiary ${
                              isDisabled ? "text-secondary" : "text-white"
                            } w-full px-6   border border-white rounded-xl`,
                          // listGroupLabel:"block text-green",
                          listItem: ({ isSelected }) =>
                            `py-2 px-6 rounded ${
                              isSelected
                                ? "bg-white/30"
                                : "tertiary-transparent"
                            } hover:bg-white/60`,
                          menu: "absolute right-0 bg-tertiary/50 rounded border w-full ",
                          // list: "bg-tertiary max-h-96 overflow-auto",
                          // listGroupLabel: "bg-black",
                        }}
                      />
                    </div>
                  )}
                </Typography>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
