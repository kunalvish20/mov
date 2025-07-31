import { MdManageSearch } from "react-icons/md";
// import Header from "@/components/Header";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { useSearch } from "@/context/Search";
import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="flex flex-col mt-4 gap-2 justify-center items-center">
        {/* <h2 className="text-4xl font-bold">Blink Search</h2> */}
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            name=""
            value={searchQuery || ""}
            onChange={handleSearchInputChange}
            placeholder="Search something"
          />
          <button
            title="search"
            className="searchButton"
            // onClick={handleSearch}
          >
            <BiSearch className="w-7 h-7 translate-x-1" />
          </button>
        </div>
      </div>
      {/* <h4 className="px-10 font-semibold text-2xl">
        Search Results for : {searchQuery}
      </h4> */}
      {searchQuery ? (
        <Main
          sectionTitle={`Search Results for ${searchQuery}`}
          url="/search/multi"
          searchQuery={searchQuery !== null ? searchQuery : undefined}
        />
      ) : (
        <>
          <div className="flex items-center flex-col justify-center min-h-[60vh]">
            <MdManageSearch size={120} className="text-zinc-500/40" />
            <h2 className="text-2xl font-bold">
              Search Some Amazing movies/series
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
