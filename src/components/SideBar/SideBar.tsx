import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataTypes } from "../../types/Types";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import folder from "../../images/folderIcon.png";
import fileIcon from "../../images/fileIcon.jpeg";

import "./sideBar.css";

const getFolderIcon = (data: DataTypes) => {
  const { name } = data;
  
  if(name){
    return <img className="sb30ItemIcon" src={folder} alt="home" />;
  } 
};

const SideBar = ({ data }: propTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (data: any) => {
    if (!data.isFolder) {
      navigate(`/file/${data.name}/${data.id}`);
      return;
    }
    if (data.id === "root") {
      navigate("/");
      dispatch(changeFolder("root"));
      return;
    }
    dispatch(changeFolder(data.id));
    navigate(`/${data.id}`);
  };

  return (
    <div>
      {data?.isFolder === true ? (
        <>
          <div className="sbar3333Data" onClick={() => handleClick(data)}>
            <div className="sbar3333Container">{getFolderIcon(data)}</div>
            <div className="sbar3333ItemText">{data.name.slice(0 ,8)}</div>
          </div>
          <div>
            {data.children.map((item: DataTypes, idx: number) => (
              <div key={idx} style={{ marginLeft:"15px" }} className="sbar3333DataChildren">
                <SideBar data={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="sbar3333Data"
            onClick={() => navigate(`/file/${data.name}/${data.id}`)}
          >
            <img className="sb30ItemIcon" src={fileIcon} alt="file" />
            <p className="sbar3333Text">{data.name.slice(0, 8)} </p>
          </div>
        </>

      )}
    </div>
  );
}

interface propTypes {
  data: DataTypes;
}

export default SideBar;
