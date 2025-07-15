import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CallToAction from "../CallToAction/CallToAction"; 
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles["app-layout"]}>
      <Header />
      <main className={styles["app-layout__main"]}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;