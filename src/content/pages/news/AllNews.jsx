import React from "react";
import NewsFormat from "./Format/NewsFormat";
import "./AllNews.scss";

function AllNews({ blogs }) {
  if (!blogs || blogs.length === 0) {
    // Return null, or a loading skeleton, or a "No news" message.
    // Returning null is the simplest and safest option.
    return null;
  }

  // --- It is now SAFE to access blogs[0] ---
  // If the code reaches this point, we know `blogs` is an array with at least one item.

  const firstNews = blogs[0];
  const otherNews = blogs.slice(1); // .slice(1) is enough to get all remaining items

  // We also need to add a check in case firstNews is an empty object from the old initial state
  // This makes the component even more robust.
  if (!firstNews || !firstNews.title) {
    return null;
  }

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
            return <NewsFormat blog={element} key={element.id || index} />; // Use element.id for a more stable key
          })}
        </div>
      </div>
    </div>
  );
}

export default AllNews;
