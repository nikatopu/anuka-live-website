import AllNews from "../../content/pages/news/AllNews";
import "./News.scss";
import { useAppContext } from "../../lib/AppContext.jsx";

function News() {
  const { blogs, loading } = useAppContext();

  return (
    <div className="section-news" id="section-news">
      {!loading && <AllNews blogs={blogs} />}
      {loading && (
        <div className="news-loading-filler">
          <div className="news-loading-filler-component-big"></div>
          {Array(6)
            .fill()
            .map(() => (
              <div className="news-loading-filler-component"></div>
            ))}
        </div>
      )}
    </div>
  );
}

export default News;
