import Image from "next/image";
import s from "./styles/About.module.css";

// Эта страница является статической, собирается только при сборке проекта. (localhost:3000/about)
// Хранится в готовом виде на сервере.
export default function About() {
  return (
    <div className={s.About}>
      <Image width={600} height={300} src="/map.png" alt="" />
      <p>
        <br />
        Ex ipsum deserunt aute aute veniam ullamco. Qui reprehenderit culpa
        voluptate eu incididunt elit aliquip proident ipsum excepteur aliquip
        enim voluptate quis. Eu consequat esse excepteur in commodo laboris
        excepteur ea cupidatat velit consectetur. Laboris labore voluptate
        laborum do sunt aute irure esse ex officia reprehenderit. Mollit in
        laboris est reprehenderit pariatur do nostrud aliquip eiusmod. Aliquip
        id eu aliquip consectetur amet aliquip aliqua magna incididunt. Commodo
        reprehenderit anim reprehenderit reprehenderit et ut. Aliqua ut cillum
        aute quis ex sint nulla non duis labore velit dolor nisi. Ullamco eu
        aute enim velit exercitation sunt. Adipisicing aute esse amet nulla
        pariatur officia adipisicing aute aliqua sunt. Enim sunt non consectetur
        magna Lorem tempor duis enim. Est tempor sit exercitation amet commodo
        reprehenderit velit. Cupidatat eu culpa officia minim consectetur
        proident consectetur anim. Cillum commodo cupidatat ex excepteur
        excepteur cillum adipisicing officia consequat voluptate aute incididunt
        non cupidatat. Lorem ad aliquip officia in culpa reprehenderit voluptate
        in nulla irure dolor. Irure dolore excepteur proident reprehenderit ea
        ipsum esse non et anim in excepteur nulla. Ipsum pariatur sit pariatur
        cillum eu magna.
      </p>
    </div>
  );
}
