import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DashboardElements from "../HomePage/HomePage";
import vacantFolder from "../../images/vacantFolder.svg";
import { DataTypes, GlobalTypes } from "../../types/Types";

import create from "../../images/create.png"
import emptyFolder from "../../images/emptyFolder.svg"

import "./displayFolder.css"; 

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;

};

const DisplayFolder = ({setIsOpen,isOpen}:Props): JSX.Element => {
  
  const { folderId } = useParams();
  let allFoldersHere: DataTypes = {} as DataTypes;
  const eachRecursive = (obj: DataTypes, id: string | undefined) => {
    if (obj.id === id) {
      {
        allFoldersHere = obj;
        return obj;
      }
    }
    for (let iterator in obj.children) {
      eachRecursive(obj.children[iterator], id);
    }
  };

  const data = useSelector(( state: GlobalTypes ) => state.fileFolder);
  eachRecursive(data, folderId);
  if (allFoldersHere.children.length !== 0) {
    return (
      <div>
        <DashboardElements items={allFoldersHere.children} setIsOpen={setIsOpen}isOpen={isOpen} />
      </div>
    );
  }
  return (
    <>
         <img
          src={create}
          className="hp6666penModalIcon hp6666ColumnDiv"
          onClick={() => setIsOpen(true)} />

          <div className="dfol7777NotFound">

          <img className="dfol7777Image" src={emptyFolder} alt="emptyFolder" />
          </div>


    </>

  )
};

export default DisplayFolder;
