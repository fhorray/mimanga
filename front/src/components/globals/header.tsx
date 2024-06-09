import { CrownIcon, LogIn, MenuIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { menu } from '../../../constants';

export const Header = () => {
  return (
    <header className="bg-slate-900 text-white fixed w-full">
      <div className="h-[90px] max-w-7xl mx-auto flex justify-between gap-10 items-center">
        <div className="flex gap-10 ">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side={'left'}
              className="flex flex-col justify-between"
            >
              {/* MENU & LOGO */}
              <div>
                <Link to={'/'}>
                  <h1 className="text-4xl mb-16 mt-8">
                    Mi<strong>Manga</strong>
                  </h1>
                </Link>
                <nav>
                  {/* TODO: Improve the menu items */}
                  <ul className="flex flex-col gap-4 w-full">
                    {menu.map((item) => (
                      <Button
                        className="self-start"
                        variant={'ghost'}
                        key={item.name}
                      >
                        <li className="flex gap-4 items-center">
                          {item.name === 'Premium' && (
                            <CrownIcon className="h-5 w-5 font-bold text-orange-500" />
                          )}
                          <Link to={item.path}>{item.name}</Link>
                        </li>
                      </Button>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* LOGIN BUTTON */}
              <Link to={'/login'}>
                <Button className="self-start flex gap-4" variant={'ghost'}>
                  <LogIn className="h-7 w-7" />
                  <span className="text-md">Login</span>
                </Button>
              </Link>
            </SheetContent>
          </Sheet>

          <Link to={'/'}>
            <h1 className="text-2xl items-center">
              Mi<strong>Manga</strong>
            </h1>
          </Link>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full max-w-md">
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
