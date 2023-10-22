//imports
import { useRouter } from "next/router";
import React from "react";
import styles from "./Nav.module.scss";

//define variables
type Props = {
  route?: string;
  children: React.ReactNode;
  end?: boolean;
  dropdown?: boolean;
  onClick?: boolean | (() => void);
  style?: React.CSSProperties;
};

const NavItem = ({ children, route, end, dropdown, onClick, style }: Props) => {
  const router = useRouter();

  const navigate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof route === "string") {
      router.push(route);
    }

    event.stopPropagation();
  };
    //return the website components of nav bar
  return (
    <div
      style={style}
      className={`${route || onClick ? styles.clickable : styles.navitem}${
        end ? ` ${styles.end}` : ""
      }${dropdown ? ` ${styles.dropdown}` : ""}`}
    //define action after clicking on nav items
      onClick={typeof onClick === "function" ? onClick : navigate}
    >
      {children}
    </div>
  );
};

export default NavItem;
