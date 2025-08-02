import AllNews from "../../content/pages/news/AllNews";
import "./News.scss";
import { useAppContext } from "../../lib/AppContext.jsx";

const NewsSkeleton = () => {
  return (
    <div className="skeleton-container">
      {/* Skeleton for the big, featured news item */}
      <div className="skeleton-featured-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>

      {/* Wrapper for the grid of smaller news items */}
      <div className="skeleton-others-wrapper">
        <div className="skeleton-grid">
          {/* Create 6 smaller skeleton cards */}
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="skeleton-small-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title-small"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

function News() {
  const { blogs, loading } = useAppContext();

  return (
    // This top-level container remains the same
    <div className="section-news" id="section-news">
      {loading ? <NewsSkeleton /> : <AllNews blogs={blogs} />}
    </div>
  );
}

export default News;
