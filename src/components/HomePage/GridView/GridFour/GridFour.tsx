import React, { useState, SetStateAction, useEffect } from "react";
import { DataTypes } from "../../../../types/Types";
import fileIcon from "../../../../images/fileIcon.jpeg";
import folder from "../../../../images/folderIcon.png";
import { changeFolder } from "../../../../redux/actionCreators/currentFolderActionCreator";
import { useNavigate } from "react-router-dom";
import DetailsModal from "../../../ElementDetailsModal/ElementDetailsModal";
import { useDispatch } from "react-redux";

import FileInfo from "../../../RightClickInfo/RightClickInfo";
import create from "../../../../images/create.png"

import "./gridFour.css"

type Props={
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    items:DataTypes[];
}


function GridFour({setIsOpen,items}:Props){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [open, setOpen] = useState(false);
    const [itemRightClicked, setItemRightClicked] = useState<DataTypes>(
      {} as DataTypes
    );
    const [singleListName,setSingleListName]=useState<string>("")
    const [singleListType,setSingleListType]=useState<string>("")
    const [singleListCreator,setSingleListCreator]=useState<string>("")

    useEffect(() => {
      window.addEventListener("click", () => {
        setOpen(false);
      });
    }, [coordinates]);



      const [openDetails, setOpenDetails] = useState(false);
      const [showDetailsOfItem, setShowDetailsOfItem] = useState<DataTypes>(
        {} as DataTypes
      );
      const [folderClicked,setFolderClicked]=useState<boolean>(false);

      function updateFolderData(listname:string,listtype:string,listcreator:string){
        setSingleListName(listname);
        setSingleListType(listtype);
        console.log(listtype);
  
        setSingleListCreator(listcreator);
        setFolderClicked(true);     
      }


    return (
        <>
            {folderClicked==true?
                <div className="gf6666FolderData" >
                  <div className="gf6666upperBar" >
                    { <div>   <img className="gf6666folder" src={(singleListType=="Default"||singleListType=="Folder")? folder:fileIcon}/> 
                      <h3 className="gf6666folderName">{singleListName}</h3></div>}
                 </div>

                  <div className="gf6666bottomBar">
                    <div className="gf6666shortInfo">
                    <img
                       className="gf6666folderShort"  src={(singleListType=="Default"||singleListType=="Folder")? folder:fileIcon}/> 
                     <span className="gf66666infoDiv" > <h4 className="gf6666NameStyle">{singleListName}</h4>{singleListType}-{"20"}kb</span>
                    </div>

                    <div className="gf6666Info">
                    <hr />
                      <div className="gf6666bolddiv" >
                      <span className="gf6666bold">Information</span>   <span className="gf6666span" style={{color:"#00BFFF"}}><a>Show More</a></span>
                      </div>

                      <div className="gf6666FolderDivs">
                      <span className="gf6666InfoTypes">Folder Name</span>   <span className="gf6666span">{singleListName}</span>
                      </div>

                      <div className="gf6666FolderDivs">
                      <span className="gf6666InfoTypes">Folder Type</span>
                      <span className="gf6666span" >{singleListType}</span>
                      </div>

                      <div className="gf6666FolderDivs">
                      <span className="gf6666InfoTypes">Folder Size</span>  <span className="gf6666span" >{"20kb"}</span>
                      </div>

                      <div className="gf6666FolderDivs">
                         <span className="gf6666InfoTypes">Creator </span> <span className="gf6666span" >{singleListCreator}</span>
                      </div>

                      <div className="gf6666tagsDiv">
                        <p className="gf6666tags">Tags</p>   <p className="gf6666alltags">Add Tags....</p>
                      </div>

                    </div>
                  </div>
                </div>:<h2 className="gf6666clickfolder" >{"Click any folder/file and get Info !!"}</h2>}    

            <div className="gf6666GridFour">
              {open && (
                <FileInfo
                  setOpen={setOpen}
                  cordinates={coordinates}
                  item={itemRightClicked}
                  setShowDetailsOfItem={setShowDetailsOfItem}
                  setOpenDetails={setOpenDetails}
                />
              )}
              {openDetails && (
                <DetailsModal setIsOpen={setOpenDetails} item={showDetailsOfItem} />
              )}
              {items?.map((item: DataTypes, idx: number) => (
                <>
                <div

                  key={idx}
                  className="hp6666ColumnDiv">
                  {item.isFolder ? (
                    <div className="hp6666IndiseColumn">

                        <img src={folder} className="hp6666Image"   onClick={() => updateFolderData(item.name,item.type,item.creator) } />
              
                      <div className="hp6666Name">{item.name.slice(0, 8)}</div>
                    </div>
                  ) : (
                    <div className="hp6666IndiseColumn">
                      <img className="hp6666Image" src={fileIcon}  onClick={() => updateFolderData(item.name,item.type,item.creator) } />
                      <div className="hp6666Name">{item.name.slice(0, 8)}</div>
                    </div>
                  )}
                </div>      
                </>

              ))}
                <img
                  src={create}
                  className="hp6666OpenModalIcon de500Column"
                  onClick={() => setIsOpen(true)} width="100px" height="90px" />
              

              
            </div>
        </>
    )
}

export default GridFour

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
