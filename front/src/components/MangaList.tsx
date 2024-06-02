import { BookIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MangaListProps {
  sectionTitle?: string;
  data: {
    title: string;
    href: string;
  }[];
}

const MangaList = ({ data, sectionTitle }: MangaListProps) => {
  return (
    <div className="flex flex-col justify-center p-8 w-2/6  rounded">
      <h2 className="w-full text-center py-6 text-3xl font-bold">
        {sectionTitle}
      </h2>
      {data.map((manga, i) => (
        <Link to={manga.href} className="text-slate-700 text-lg font-bold">
          <div key={i} className="flex gap-4 mb-4">
            {/* NUMBER */}
            <div className="w-16 h-14 rounded bg-slate-700 text-white font-bold flex items-center justify-center">
              {i + 1}
            </div>

            {/* MANGA INFO */}
            <div className="flex flex-col gap-1 w-full">
              <h4 className="text-lg font-bold">{manga.title}</h4>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((start) => (
                    <StarIcon key={start} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <BookIcon className="w-4 h-4 text-slate-700" />
                  <span> 86 Chapters</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MangaList;
