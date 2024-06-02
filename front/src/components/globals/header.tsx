import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-[90px] flex justify-between items-center px-16 bg-slate-900 text-white ">
      <h1 className="text-2xl">
        Mi<strong>Manga</strong>
      </h1>

      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/mangas">Mangás</Link>
          </li>
          <li>Our Series</li>
          <li>Comics</li>
          <li>Novels</li>
          <li>Premium</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
