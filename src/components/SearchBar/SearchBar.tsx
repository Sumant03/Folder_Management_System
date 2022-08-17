import { useSelector } from "react-redux";
import HomePage from "../HomePage/HomePage";
import notFound from "../../images/notFound.jpeg";

import "./searchBar.css";


type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const SearchBar = ({setIsOpen,isOpen}:Props) => {
  const search = useSelector((state: any) => state.search.searchResults);

  if (search.length === 0) {
    return (
      <div className="search5555NotFind">
        <img src={notFound} alt="no result" className="search5555Image" />
        <h2>No Folder/File Found !!</h2>
      </div>
    );
  }
  return <HomePage items={search} setIsOpen={setIsOpen} isOpen={isOpen} />;
};



export default SearchBar;
