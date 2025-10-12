import { SearchBar } from "../search-bar";

export default function SearchBarExample() {
  return (
    <div className="p-6 bg-background">
      <SearchBar onSearch={(query) => console.log("Search query:", query)} />
    </div>
  );
}
