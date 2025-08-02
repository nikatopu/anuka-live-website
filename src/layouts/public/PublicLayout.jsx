import React from "react";
import { Outlet } from "react-router-dom";
import style from "./PublicLayout.module.scss"; // <-- IMPORT THE STYLES
import Header from "../../content/components/Header";
import Footer from "../../content/components/Footer";
import PageGradients from "../../content/PageGradients";

const PublicLayout = () => {
  return (
    <div className={style.publicLayoutContainer}>
      <PageGradients />
      <Header />
      <main className={style.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
