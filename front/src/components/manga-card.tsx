import { LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MangaCard = () => {
  return (
    <div className="h-40 min-w-[32%] bg-slate-100 rounded flex gap-4">
      {/* IMAGE */}
      <div>
        <img
          src="https://placehold.co/467x700"
          alt="Manga cover"
          className="w-full h-full rounded"
        />
      </div>

      <div className="py-4 w-full max-w-64 flex flex-col gap-2">
        {/* TITLE */}
        <Link to={"/"}>
          <h3 className="text-slate-900 text-lg font-bold">Manga title</h3>
        </Link>

        {/* LAST 2 CHAPTER */}
        <Link to={"/"}>
          {[1, 2].map((_, i) => (
            <p
              className="text-slate-700 flex items-center justify-between w-full pb-1"
              key={i}
            >
              Chapter 12
              <span>6/2/2024</span>
            </p>
          ))}
        </Link>
        <hr />

        {/* LAST RELEASE */}
        <div className="text-slate-700 flex items-center justify-between w-full pb-1">
          <p className="flex items-center gap-2 font-bold">
            <LockIcon className="w-4 h-4" strokeWidth={2} /> Chapter 14
          </p>
          <span>2 Hours Ago</span>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
