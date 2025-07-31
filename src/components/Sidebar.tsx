import {
  Home,
  ShoppingCart,
  Users,
  LineChart,
  Clapperboard,
  Film,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Clapperboard className="h-6 w-6" />
              <span className="">Sinema</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
              <Link
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
              </Link>
              <Link
                to="/upload"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  pathname.includes("upload")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Film className="h-4 w-4" />
                Your Movie{" "}
              </Link>
              <Link
                to="/community"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  pathname.includes("community")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Users className="h-4 w-4" />
                Community
              </Link>
              <Link
                to="/analytics"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  pathname.includes("analytics")
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
