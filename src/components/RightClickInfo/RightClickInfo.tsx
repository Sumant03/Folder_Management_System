import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { deleteAnyItem } from "../../redux/actionCreators/CreateActionCreators";
import { DataTypes } from "../../types/Types";

import "./rightClickInfo.css";

const FileInfo = ({
  cordinates,
  item,
  setOpen,
  setShowDetailsOfItem,
  setOpenDetails
}: propTypes) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = item;

  const handleOpenClick = () => {
    if (!item.isFolder) {
      navigate(`/file/${item.name}/${id}`);
      return;
    }
    dispatch(changeFolder(id));
    navigate(`/${id}`);
  }

  const handleShowDetailsClick = () => {
    setOpenDetails(true)
    setShowDetailsOfItem(item);
  };

  const handleDeleteClick:any = () => {
    dispatch(deleteAnyItem(id));
  };


  return (
    <div
      style={{ top: cordinates.y, left: cordinates.x }}
      className="rci9999Menu"
      onClick={() => setOpen(false)}
    >
      <div className="rci9999MenuItem" onClick={handleOpenClick}>
        Open
      </div>
      <div className="rci9999MenuItem" onClick={handleShowDetailsClick}>
        View Details
      </div>
      <div onClick={handleDeleteClick} className="rci9999MenuItem">
        Delete
      </div>
    </div>
  );
};


type propTypes = {
  cordinates: { x: number; y: number };
  item: DataTypes;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetailsOfItem: React.Dispatch<React.SetStateAction<DataTypes>>;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
};


export default FileInfo;
