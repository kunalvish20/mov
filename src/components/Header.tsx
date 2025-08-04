import { BiSearch } from "react-icons/bi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, Film, Home, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";
import { useGenres } from "@/context/Genre";
import { Separator } from "./ui/separator";
import { useGenre } from "@/hooks/useGenre";

interface Genre {
  id: number;
  name: string;
}

const Header = ({ extraClasses = "" }) => {
  const { setTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [genreName, setGenreName] = useState<string | undefined>(undefined);
  const { genres, setGenres } = useGenres();
  const { apiList } = useGenre("/genre/movie/list?language=en");

  const onGenreChange = (value: string) => {
    const genreId = Number(value);
    setGenres(genreId);
    const selectedGenre = apiList?.find(
      (genre: Genre) => genre.id === genreId
    )?.name;
    setGenreName(selectedGenre);
    navigate(`/movies/${selectedGenre}`);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md ${extraClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.webp"
              alt="KVTV Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-lg font-medium transition-colors duration-300 ${
                pathname === "/"
                  ? "text-[#FD0000] font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`text-lg font-medium transition-colors duration-300 ${
                pathname.includes("/movies")
                  ? "text-[#FD0000] font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv-series"
              className={`text-lg font-medium transition-colors duration-300 ${
                pathname.includes("/tv")
                  ? "text-[#FD0000] font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
              }`}
            >
              TV Series
            </Link>

            {/* Genres Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent p-0"
                >
                  {genreName || "Genres"}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
                <DropdownMenuRadioGroup
                  value={genres?.toString()}
                  onValueChange={onGenreChange}
                >
                  {apiList.map((genre) => (
                    <DropdownMenuRadioItem
                      key={genre.id}
                      value={genre.id.toString()}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {genre.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 w-px bg-gray-300 dark:bg-gray-700" />

            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent"
              onClick={() => navigate("/search")}
            >
              <BiSearch className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent"
              onClick={() => navigate("/search")}
            >
              <BiSearch className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80">
                <div className="flex flex-col h-full py-6">
                  <div className="mb-8">
                    <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
                      <img
                        src="/logo.webp"
                        alt="KVTV Logo"
                        className="h-10 w-10"
                      />
                      <span className="dark:text-white">KVTV</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link
                      to="/"
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300 ${
                        pathname === "/"
                          ? "text-[#FD0000] font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
                      }`}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                    <Link
                      to="/movies"
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300 ${
                        pathname.includes("/movies")
                          ? "text-[#FD0000] font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
                      }`}
                    >
                      <Film className="h-5 w-5" />
                      Movies
                    </Link>
                    <Link
                      to="/tv-series"
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300 ${
                        pathname.includes("/tv")
                          ? "text-[#FD0000] font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000]"
                      }`}
                    >
                      <Film className="h-5 w-5" />
                      TV Series
                    </Link>
                    
                    <Separator />

                    <h4 className="text-gray-500 font-semibold px-4 pt-2">Genres</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-lg text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent pl-4 pr-3"
                        >
                          <span>{genreName || "Select Genre"}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[calc(100%-2rem)] mx-4">
                        <DropdownMenuRadioGroup
                          value={genres?.toString()}
                          onValueChange={onGenreChange}
                          className="max-h-60 overflow-y-auto"
                        >
                          {apiList.map((genre) => (
                            <DropdownMenuRadioItem
                              key={genre.id}
                              value={genre.id.toString()}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              {genre.name}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Separator />
                    
                    <h4 className="text-gray-500 font-semibold px-4 pt-2">Theme</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-lg text-gray-700 dark:text-gray-300 hover:text-[#FD0000] dark:hover:text-[#FD0000] hover:bg-transparent pl-4 pr-3"
                        >
                          <div className="flex items-center gap-3">
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            Theme
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[calc(100%-2rem)] mx-4">
                        <DropdownMenuItem
                          onClick={() => setTheme("light")}
                          className="cursor-pointer"
                        >
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme("dark")}
                          className="cursor-pointer"
                        >
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme("system")}
                          className="cursor-pointer"
                        >
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;