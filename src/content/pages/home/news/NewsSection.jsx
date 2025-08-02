import React from "react";
import "./NewsSection.scss";
import BillBoard from "./billboards/BillBoard";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../lib/AppContext";

// --- A Skeleton Loader Component for a Better UX ---
const NewsSectionSkeleton = () => {
  return (
    <div className="section-news" id="section-news-skeleton">
      <div className="section-news-header">
        {/* You can keep the static SVG header */}
        <svg
          width="155"
          height="32"
          viewBox="0 0 155 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... your SVG paths ... */}
        </svg>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-featured-card" />
        <div className="skeleton-right-column">
          <div className="skeleton-billboard" />
          <div className="skeleton-billboard" />
          <div className="skeleton-billboard" />
        </div>
      </div>
    </div>
  );
};

function NewsSection() {
  const { blogs, loading } = useAppContext();

  // --- THE FIX: GUARD CLAUSES ---

  // 1. If the context is loading, show the skeleton and stop.
  if (loading) {
    return <NewsSectionSkeleton />;
  }

  // 2. If loading is done but there are no blogs, render nothing.
  if (!blogs || blogs.length === 0) {
    return null;
  }

  // --- IT'S NOW SAFE TO RENDER THE REAL COMPONENT ---
  // We are guaranteed that `blogs` is an array with at least one item.

  const firstBlog = blogs[0];
  const otherBlogs = blogs.slice(1, 4);

  return (
    <div className="section-news" id="section-news">
      <div className="section-news-header">
        <svg
          width="155"
          height="32"
          viewBox="0 0 155 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.1429 0H14.8571V13.2409L5.49442 3.87816L3.87818 5.49442L13.2409 14.8571H0V17.1429H13.2409L3.87818 26.5056L5.49442 28.1218L14.8571 18.759V32H17.1429V18.759L26.5056 28.1218L28.1218 26.5056L18.759 17.1429H32V14.8571H18.759L28.1218 5.4944L26.5056 3.87816L17.1429 13.2409V0Z"
            fill="#52ABFF"
          />
          <path
            d="M45.776 7.556H54.08C55.928 9.812 57.776 12.044 59.576 14.324C61.208 16.388 62.816 18.5 64.424 20.612L64.328 12.836V7.556H69.224V24.5H60.896C58.904 22.076 56.912 19.652 54.968 17.156C53.528 15.308 52.112 13.412 50.72 11.54V24.5H45.776V7.556ZM73.5076 7.556H92.4436V11.3H78.6676V14.132H91.6996V17.684H78.6676V20.66H92.4436V24.5H73.5076V7.556ZM105.404 20.276L109.748 7.556H116.156L120.308 20.276L125.396 7.556H130.82C130.58 8.036 130.34 8.492 130.124 8.972C129.788 9.692 129.452 10.412 129.14 11.156C128.3 13.124 127.532 15.116 126.74 17.108C125.732 19.58 124.676 22.052 123.596 24.5H116.684L112.892 12.428L108.908 24.5H101.972L95.0838 7.556H100.412C101.396 10.1 102.356 12.668 103.364 15.212C104.036 16.892 104.732 18.596 105.404 20.276ZM133.039 18.932L138.343 18.956C138.343 19.34 138.343 19.652 138.463 19.94C138.655 20.492 139.159 20.708 140.263 20.804C141.343 20.852 142.399 20.9 143.479 20.924C144.631 20.948 145.783 20.9 146.959 20.876C147.127 20.876 147.871 20.948 148.399 20.732C148.927 20.54 149.383 20.012 149.383 19.436C149.383 19.292 149.359 19.004 149.143 18.692C148.735 18.116 148.207 18.14 147.007 17.972C144.511 17.924 142.015 17.9 139.543 17.756C138.751 17.708 137.959 17.636 137.167 17.588C136.927 17.54 136.663 17.516 136.423 17.468C136.087 17.42 134.911 17.228 134.095 16.34C133.567 15.764 133.087 14.732 133.087 13.004C133.087 12.884 133.087 11.036 133.519 9.956C133.687 9.548 133.927 9.188 134.215 8.876C135.199 7.82 136.495 7.652 137.911 7.484C139.759 7.412 141.607 7.34 143.455 7.34C145.495 7.34 147.535 7.46 149.575 7.556L150.511 7.7C150.871 7.748 152.047 7.964 152.959 8.804C154.135 9.884 154.135 11.396 154.087 12.884L148.951 12.86C148.639 11.564 148.399 11.396 147.031 11.252C145.783 11.18 144.511 11.132 143.263 11.132C142.279 11.132 141.319 11.18 140.335 11.204C139.687 11.228 139.087 11.252 138.679 11.78C138.607 11.876 138.391 12.188 138.391 12.548C138.391 12.908 138.583 13.196 138.679 13.292C139.135 13.868 139.711 13.892 140.359 13.94L150.535 14.3C151.927 14.444 152.455 14.636 153.055 15.068C153.919 15.692 154.687 16.796 154.687 19.268C154.687 21.188 154.351 22.1 153.823 22.844C153.607 23.132 153.415 23.348 153.127 23.564C152.335 24.14 151.303 24.308 150.247 24.476C148.159 24.596 146.095 24.692 144.007 24.692C141.751 24.692 139.495 24.548 137.215 24.428C136.087 24.26 134.815 24.044 133.975 23.132C133.015 22.1 133.039 20.204 133.039 18.932Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="section-news-body">
        <a
          className="section-news-body-left"
          href={firstBlog.redirectLink}
          target="_blank"
          rel="noreferrer"
        >
          <picture>
            <source src={firstBlog.imageUrl} />
            <img src={firstBlog.imageUrl} alt={firstBlog.description} />
          </picture>
          <div className="section-news-body-left-description">
            <h2>{firstBlog.title}</h2>
            <p>{firstBlog.description}</p>
          </div>
        </a>
        <div className="section-news-body-right">
          {otherBlogs.map((element, index) => (
            <BillBoard
              title={element.title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
              description={element.description}
              link={element.redirectLink}
              tag={element.tags}
              key={element.id || index} // Use a stable key like element.id
            />
          ))}
          <Link
            className="section-news-body-right-viewmore"
            to={"/news"}
            onClick={() => window.scrollTo(0, 0)}
          >
            View More
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5875 2.41151L1.99978 7.99923C1.85811 8.1409 1.69143 8.21174 1.49976 8.21174C1.30808 8.21174 1.14141 8.1409 0.999737 7.99923C0.858064 7.85756 0.787228 7.69089 0.787228 7.49921C0.787228 7.30754 0.858065 7.14086 0.999737 6.99919L6.58746 1.41147L1.68726 1.41147C1.48726 1.41147 1.32267 1.34271 1.19349 1.20521C1.06432 1.0677 0.999736 0.898945 0.999736 0.698937C1.00807 0.507263 1.07682 0.342673 1.20599 0.205167C1.33517 0.0676615 1.49976 -0.00109117 1.69976 -0.00109114L8.30003 -0.00109097C8.40003 -0.00109063 8.48962 0.01766 8.56879 0.0551616C8.64796 0.0926632 8.72088 0.144749 8.78755 0.211418C8.85422 0.278087 8.90631 0.351007 8.94381 0.430177C8.98131 0.509346 9.00006 0.598934 9.00006 0.698937L9.00006 7.2992C9.00006 7.48255 8.93131 7.64297 8.7938 7.78047C8.6563 7.91798 8.49171 7.9909 8.30003 7.99923C8.10002 7.99923 7.93127 7.93048 7.79376 7.79297C7.65626 7.65547 7.5875 7.48671 7.5875 7.2867V2.41151Z"
                fill="#F86830"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
