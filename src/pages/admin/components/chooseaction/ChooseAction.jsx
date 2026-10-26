import { Link } from "react-router-dom";
import { FiFileText, FiMusic, FiVideo, FiArrowRight } from "react-icons/fi";
import style from "./ChooseAction.module.scss";

export default function ChooseAction() {
  const options = [
    {
      title: "Blogs",
      description: "Edit, add or delete blogs",
      link: "/admin/blogs",
      icon: <FiFileText />,
    },
    {
      title: "Music",
      description: "Edit, add or delete music",
      link: "/admin/songs",
      icon: <FiMusic />,
    },
    {
      title: "Sound Design",
      description: "Edit, add or delete sound design reels",
      link: "/admin/sound-design",
      icon: <FiVideo />,
    },
  ];

  return (
    <div className={style.container}>
      {options.map((option) => (
        <Link className={style.option} to={option.link} key={option.link}>
          <span className={style.icon}>{option.icon}</span>
          <div className={style.text}>
            <h2>{option.title}</h2>
            <p>{option.description}</p>
          </div>
          <FiArrowRight className={style.arrow} />
        </Link>
      ))}
    </div>
  );
}
