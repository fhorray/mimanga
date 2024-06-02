import MangaList from "./components/MangaList";
import { Footer } from "./components/globals/footer";
import { Header } from "./components/globals/header";
import MangaCard from "./components/manga-card";
import { Button } from "./components/ui/button";

function App() {
  const list = [
    {
      title: "One Piece",
      href: "/manga/one-piece",
    },
    {
      title: "Naruto",
      href: "/manga/naruto",
    },
    {
      title: "Bleach",
      href: "/manga/bleach",
    },
    {
      title: "Dragon Ball",
      href: "/manga/dbz",
    },
    {
      title: "Attack on Titan",
      href: "/manga/aot",
    },
    {
      title: "My Hero Academia",
      href: "/manga/mhacademia",
    },
  ];
  console.log(list);

  return (
    <>
      <Header />

      {/* CONTENT */}
      <main className="w-full max-w-7xl mx-auto py-16">
        <div className="flex gap-2 py-16">
          {/* TODO: SLIDER */}
          <div className="h-40 w-full bg-slate-100 rounded">SLIDER</div>
          {/* TODO: NEWS AREA */}
          <div className="h-40 w-3/6 bg-slate-300 rounded">ANNOUNCMENTS</div>
        </div>

        {/* LATEST RELEASES */}
        <div className="flex flex-col gap-8">
          <h2 className="text-slate-900 text-6xl font-bold">
            Our Latest Releases
          </h2>

          {/* CARDS */}
          <div className="flex gap-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <MangaCard key={card} />
            ))}
            <Button className="w-full">Load More</Button>
          </div>
        </div>

        {/* POPULAR */}
        <div className="flex gap-2 py-16">
          {/* TODO: TODAY */}
          <MangaList data={list} sectionTitle="Today" />

          {/* TODO: WEEK */}
          <MangaList data={list} sectionTitle="Week" />

          {/* TODO: ALL TIME */}
          <MangaList data={list} sectionTitle="All Time" />
        </div>

        {/* LATEST UPDATES ON NOVELS */}
        <div className="flex flex-col gap-8">
          <h2 className="text-slate-900 text-6xl font-bold">Latest Updates</h2>

          {/* CARDS */}
          <div className="flex gap-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <MangaCard key={card} />
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
