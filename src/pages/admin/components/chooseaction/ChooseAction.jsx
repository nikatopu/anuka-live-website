import { Link } from "react-router-dom";
import style from "./ChooseAction.module.scss";

export default function ChooseAction() {
  const options = [
    {
      title: "Blogs",
      description: "Edit, add or delete blogs",
      link: "/admin/blogs",
    },
    {
      title: "Music",
      description: "Edit, add or delete music",
      link: "/admin/songs",
    },
  ];

  return (
    <div className={style.container}>
      {options.map((option, i) => (
        <Link className={style.option} to={option.link} key={i}>
          <h1>{option.title}</h1>
          <p>{option.description}</p>
        </Link>
      ))}
    </div>
  );
}
