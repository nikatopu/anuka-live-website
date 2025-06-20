import React from "react";
import NewsFormat from "./Format/NewsFormat";
import "./AllNews.scss";

function AllNews({ blogs }) {
  const firstNews = blogs[0];
  const otherNews = blogs.slice(1, blogs.length);

  return (
    <div className="section-blogs">
      <div className="section-blogs-first" id={firstNews.title}>
        <img
          src={firstNews.imageUrl}
          alt={firstNews.title}
          id="background-image"
        />
        <div className="section-blogs-first-description">
          <div className="section-blogs-first-description-text">
            <h1>{firstNews.title}</h1>
            <p>{firstNews.description}</p>
          </div>
          <a
            className="section-blogs-first-redirect-arrow"
            href={firstNews.redirectLink}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/svg/redirectArrow.svg" alt="redirection" />
          </a>
        </div>
      </div>
      <div className="section-blogs-others-wrapper">
        <div className="section-blogs-others">
          {otherNews.map((element, index) => {
            return <NewsFormat blog={element} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllNews;
