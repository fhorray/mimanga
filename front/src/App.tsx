import Header from "./components/globals/header";
import MangaCard from "./components/manga-card";
import { Button } from "./components/ui/button";

function App() {
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
            Our latest releases on comics!
          </h2>

          {/* CARDS */}
          <div className="flex gap-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <MangaCard key={card} />
            ))}
            <Button className="w-full">Load more</Button>
          </div>
        </div>

        {/* POPULAR */}
        <div className="flex gap-2 py-16">
          {/* TODO: TODAY */}
          <div className="h-80 w-2/6 bg-slate-300 rounded">TODAY</div>
          {/* TODO: WEEK */}
          <div className="h-80 w-2/6 bg-slate-300 rounded">WEEK</div>
          {/* TODO: ALL TIME */}
          <div className="h-80 w-2/6 bg-slate-300 rounded">ALL TIME</div>
        </div>

        {/* LATEST UPDATES ON NOVELS */}
        <div className="flex flex-col gap-8">
          <h2 className="text-slate-900 text-6xl font-bold">
            Latest updates on novels
          </h2>

          {/* CARDS */}
          <div className="flex gap-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <MangaCard key={card} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
