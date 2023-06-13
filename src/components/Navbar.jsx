import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PowerIcon } from "@heroicons/react/24/solid";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, logoutIcon } from "../assets";
import { useSelector } from "react-redux";
import { removeToken } from "../utils/common";
import Select from "react-tailwindcss-select";
import { Typography } from "@material-tailwind/react";

const Navbar = () => {
  const AuthUser = useSelector((state) => state.auth.data);
  const AuthUserLoading = useSelector((state) => state.auth.loading);

  const [currency, setCurrency] = useState({
    value: "AED",
    label: "AED",
    isSelected: true
  },);

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
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
            Access Wealth
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
                  await removeToken();
                  window.location.reload();
                }
              }}
            >
              {nav.id === "logout" ? (
                <Typography
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer flex items-center justify-end gap-2 capitalize`}
                >
                  {AuthUser?.username}
                  <PowerIcon className="h-5 w-5" />
                </Typography>
              ) : (
                <div>
                  <Select
                    value={currency}
                    onChange={(currency) => {
                      setCurrency(currency);
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
                      // menuButton: (props) => {
                      //   "block border border-white-100 text-sm text-primary rounded bg-tertiary";
                      // },
                      // listGroupLabel:"block text-green",
                      // listItem: ({ isSelected }) => " hover:bg-tertiary/20",
                      // menuButton:(props)=>"w-full text-black text-xl",
                      // list: "bg-green max-h-96 overflow-auto",
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
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
