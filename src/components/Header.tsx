import { BiCategory } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  // Bell,
  ChevronDown,
  // CircleUser,
  Film,
  Home,
  // LineChart,
  Menu,
  Search,
  Moon,
  // ShoppingCart,
  Sun,
  // Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../favicon-32x32.png";
// import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";
import { useGenres } from "@/context/Genre";
import { Separator } from "./ui/separator";
// import useFetch from "@/hooks/UseFetch";
import { useGenre } from "@/hooks/useGenre";
// import { useEffect } from "react";

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
  // console.log(genres);
  return (
    <>
      <div
        className={`flex justify-between items-center border-b dark:text-white w-full left-0 z-10 md:px-10 px-4 py-2 ${extraClasses}`}
      >
        <Link to={"/"} className="flex gap-1 items-center">
          <h3 className="font-black text-3xl tracking-wide md:block hidden">
            Sinema
          </h3>
          <img src={logo} className="w-10 h-10" alt="Sinema-Movie-Icon" />
        </Link>
        <div className="flex gap-4 items-center">
          <Search className="md:hidden" />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={logo} alt="blink" className="h-10 w-10" />
                  <span className="sr-only">Blink</span>
                </Link>
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.endsWith("/")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                {/* <Link
                  to="/genres"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("genres")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Genres
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link> */}
                {/* <Link
                to="/upload"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  pathname.includes("upload")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Film className="h-4 w-4" />
                Your Movie{" "}
              </Link> */}
                <Link
                  to="/movies"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("movie")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Film className="h-4 w-4" />
                  Movie
                </Link>
                <Link
                  to="/tv-series"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("tv")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Film className="h-4 w-4" />
                  Tv Shows
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-lg hover:bg-transparent text-muted-foreground p-0 font-semibold justify-start ps-3"
                    >
                      <BiCategory className="mr-3" />
                      Genres
                      <ChevronDown size={14} className="mt-2 ms-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto">
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuRadioGroup
                      value={genres?.toString()}
                      onValueChange={onGenreChange}
                      className="h-[200px] overflow-y-auto"
                    >
                      {apiList.map((genre) => (
                        <DropdownMenuRadioItem
                          key={genre.id}
                          value={genre.id.toString()}
                        >
                          <span>{genre.name}</span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full flex gap-2">
                    <Button
                      size="icon"
                      className="justify-start ps-11 text-lg font-semibold bg-transparent text-muted-foreground"
                    >
                      <Sun className="h-[1.2rem] w-[1.2rem] absolute left-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] left-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                      Theme
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[190px]">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <Link
                  to="/community"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("community")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Users className="h-4 w-4" />
                  Community
                </Link> */}
                {/* <Link
                  to="/analytics"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("analytics")
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link> */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:flex hidden gap-8 items-center text-xl">
          <Link
            to={"/"}
            className={`${
              pathname.endsWith("/") ? "text-pink-600 font-bold" : ""
            }`}
          >
            Home
          </Link>
          {/* <Link to={"/genres"}>Genre</Link> */}
          <Link
            to={"/movies"}
            className={`${
              pathname.includes("/movies") ? "text-pink-600 font-bold" : ""
            }`}
          >
            Movie
          </Link>
          <Link
            to={"/tv-series"}
            className={`${
              pathname.includes("/tv") ? "text-pink-600 font-bold" : ""
            }`}
          >
            TV Series
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-xl hover:bg-transparent p-0 font-normal"
              >
                {genreName || "Genres"}
                <ChevronDown size={14} className="mt-2 ms-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuRadioGroup
                value={genres?.toString()}
                onValueChange={onGenreChange}
                className="h-[200px] overflow-y-auto"
              >
                {apiList.map((genre) => (
                  <DropdownMenuRadioItem
                    key={genre.id}
                    value={genre.id.toString()}
                  >
                    <span>{genre.name}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="w-0.5 mt-2 h-6" />
          <Link to={""} className="mt-2">
            <BiSearch size={24} onClick={() => navigate("/search")} />
          </Link>
          {/* <Link to="#" className="text-lg font-semibold">
            Community
          </Link> */}
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-12">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-none" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-10" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </>
  );
};

export default Header;
