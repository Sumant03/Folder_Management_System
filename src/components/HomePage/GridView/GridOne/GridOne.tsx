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

type Props={
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    items:DataTypes[];
}


function GridOne({setIsOpen,items}:Props){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [open, setOpen] = useState(false);
    const [itemRightClicked, setItemRightClicked] = useState<DataTypes>(
      {} as DataTypes
    );

    useEffect(() => {
      window.addEventListener("click", () => {
        setOpen(false);
      });
    }, [coordinates]);



    const handleDoubleClick = (name: string, id: string, isFolder: boolean) => {
        if (!isFolder) {
          navigate(`/file/${name}/${id}`);
          return;
        }
        dispatch(changeFolder(id));
        navigate(`/${id}`);

        console.log("isnide handleDoubleClick");
        
      };
    
      const handleContextMenuClick = (
        e: React.MouseEvent<HTMLDivElement>,
        item: DataTypes
      ) => {
        e.preventDefault();
        setCoordinates({ x: e.pageX, y: e.pageY });
        setItemRightClicked(item);
        setOpen(true);

        console.log("isnide contextEmnu");
      };
    
      const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOpen(false);

        console.log("isnide handleClick");
      };

      const [openDetails, setOpenDetails] = useState(false);
      const [showDetailsOfItem, setShowDetailsOfItem] = useState<DataTypes>(
        {} as DataTypes
      );


    return (
        <>
    <div className="hp6666RowDisplay">
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
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenuClick(e, item)}
          onDoubleClick={() =>
            handleDoubleClick(item.name, item.id, item.isFolder)
          }
          key={idx}
          className="hp6666ColumnDiv">
          {item.isFolder ? (
            <div className="hp6666IndiseColumn">

                <img src={folder} className="hp6666Image" />
       
              <div className="hp6666Name">{item.name.slice(0, 8)}</div>
            </div>
          ) : (
            <div className="hp6666IndiseColumn">
              <img className="hp6666Image" src={fileIcon} />
              <div className="hp6666Name">{item.name.slice(0, 8)}</div>
            </div>
          )}
         </div>      
        </>

      ))}
        <img
          src={create}
          className="hp6666penModalIcon hp6666ColumnDiv"
          onClick={() => setIsOpen(true)} />
       

      
    </div>
        </>
    )
}

export default GridOne

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
