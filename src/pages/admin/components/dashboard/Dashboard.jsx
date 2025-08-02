import { useAppContext } from "../../../../lib/AppContext";
import ChooseAction from "../chooseaction/ChooseAction";
import style from "./Dashboard.module.scss";
import { FiFileText, FiMusic } from "react-icons/fi"; // Import icons for stats

const StatCard = ({ icon, title, value, loading }) => {
  return (
    <div className={style.statCard}>
      <div className={style.statIcon}>{icon}</div>
      <div className={style.statContent}>
        <span className={style.statTitle}>{title}</span>
        {loading ? (
          <div className={style.skeletonStatValue}></div>
        ) : (
          <span className={style.statValue}>{value}</span>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Get live data from our global context
  const { blogs, songs, loading: isGlobalLoading } = useAppContext();

  return (
    <div className={style.dashboardContainer}>
      <header className={style.dashboardHeader}>
        <h1>Welcome Back!</h1>
        <p>
          Here's a quick overview of your content. Select an action below to get
          started.
        </p>
      </header>

      {/* --- At-a-Glance Statistics --- */}
      <div className={style.statsGrid}>
        <StatCard
          icon={<FiFileText size={24} />}
          title="Total Blogs"
          value={blogs.length}
          loading={isGlobalLoading}
        />
        <StatCard
          icon={<FiMusic size={24} />}
          title="Total Songs"
          value={songs.length}
          loading={isGlobalLoading}
        />
        {/* You can easily add more stat cards here in the future */}
      </div>

      {/* --- Main Action/Navigation Component --- */}
      <div className={style.actionsContainer}>
        {/* Your ChooseAction component will be rendered here */}
        <ChooseAction />
      </div>
    </div>
  );
};

export default Dashboard;
