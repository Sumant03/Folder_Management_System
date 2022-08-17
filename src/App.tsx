import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

import Modal from "./components/Modal/Modal";
import { GlobalTypes } from "./types/Types"
import { changeFolder } from "./redux/actionCreators/currentFolderActionCreator";
import HomePage from "./components/HomePage/HomePage";
import SideBar from "./components/SideBar/SideBar";
import SearchBar from "./components/SearchBar/SearchBar";
import DisplayFile from "./components/DisplayFile/DisplayFile"
import DisplayFolder from "./components/DisplayFolder/DisplayFolder";

import "./App.css";



const App = () => {

  const data = useSelector((state: any) => state.fileFolder);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state?.search?.query);
  const { rootFolderDetails } = useSelector((state: GlobalTypes) => ({
    rootFolderDetails: state.fileFolder,
  }));
  const navigatge = useNavigate();
  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(changeFolder("root"));
      navigatge("/");
    }
  }, [searchQuery]);
  

  return (
    <div className="app1111AppDiv">
      {open && <Modal setIsOpen={setOpen} />}
      <div className="app1111Sidebar">
        {/* <SideBar data={data} /> */}
      </div>
      <div className="app1111HomePage">
        <NavBar/>

        <Routes>
          {searchQuery?.length > 0 ? (
            <Route path="/" element={<SearchBar setIsOpen={setOpen} isOpen={open} />} />
          ) : (
            <Route
              path="/"
              element={<HomePage items={rootFolderDetails.children} setIsOpen={setOpen} isOpen={open} />}
            />
          )}

          <Route path="/:folderId" element={<DisplayFolder setIsOpen={setOpen} isOpen={open} />} />
          <Route path="/file/:query/:fileId" element={<DisplayFile/>} />
        </Routes>
      </div>
    </div>
  );
};


export default App;




