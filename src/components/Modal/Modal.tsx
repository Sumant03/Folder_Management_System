import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createAnyItem } from "../../redux/actionCreators/CreateActionCreators";
import { getUid } from "../../utils/getUid";


import "./modal.css";


const Modal = ({ setIsOpen }: props) => {

  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [exactType, setExactType] = useState("");
  const createInside = useSelector((state: any) => state.currentFolder);
  const [createFile, setCreateFile] = useState(false);
  

  const handleCreateFolder = () => {
    const data = {
      name: itemName,
      id: getUid(),
      isFolder: true,
      children: [],
      type: exactType,
      creator: authorName,
      createdAt: new Date().toLocaleDateString(),
    };
    dispatch(createAnyItem({ createInside: createInside, item: data }));
    setIsOpen(false);
  };

  const handleFileCreation = () => {

    const data = {
      name: itemName,
      id: getUid(),
      isFolder: false,
      children: [],
      creator: authorName,
      type: exactType,
      createdAt: new Date().toLocaleDateString(),
    };
    dispatch(createAnyItem({ createInside: createInside, item: data }));
    setIsOpen(false);
    
  };

  return (
    <>
      <div className="modal2222Back" onClick={() => setIsOpen(false)} />
      <div className="modal2222centerDiv">
        <div className="modal2222Open">
          <div className="modal2222Header">
            <div className="modal2222Close">
              <button
                className="modal2222Closebtn"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
            <h2 className="modal2222Heading">Create New</h2>
          </div>
          <div className="modal2222Selector">
            <span
              onClick={() => setCreateFile(false)}
              className={`modal2222btn modal2222FolButton ${
                createFile == false ? "modal2222Active" : ""
              }`}
            >
              Folder
            </span>
            <span
              onClick={() => setCreateFile(true)}
              className={`modal2222btn modal2222FilButton ${
                createFile == true ? "modal2222Active" : ""
              }`}
            >
              File
            </span>
          </div> 
          <div className="modal2222Content">
            <input
              className="modal2222Input"
              required
              placeholder="Enter name... "
              onChange={(e) => {
                e.preventDefault();
                setItemName(e.target.value);
              }}
            />
            <br />
            <input
              className="modal2222Input"
              placeholder="Enter Type... "
              onChange={(e) => setExactType(e.target.value)}
            />
            <br />
            <input
              className="modal2222Input"
              placeholder="Creator's name... "
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="modal20Submit">
            <div className="modal2222Actions">
            <button onClick={() => setIsOpen(false)} className="modal2222create">
                  Cancel
              </button>
              {createFile == true ? (
                <>
               <button onClick={handleFileCreation} className="modal2222create">
                  Create 
                </button>
                </>
              ) : (
                <>
                <button onClick={handleCreateFolder} className="modal2222create">
                  Create
                </button>               
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


type props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


export default Modal;
