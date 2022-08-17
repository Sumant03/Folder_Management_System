import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataTypes, GlobalTypes } from "../../types/Types";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { setQuery } from "../../redux/actionCreators/searchActionCreator";

import searchIcon from "../../images/searchIcon.png"

import grid1 from "../../images/grid1.png"
import grid2 from "../../images/grid2.png"
import grid4 from "../../images/grid4.png"
import sort from "../../images/Sort.png"

import "./navBar.css";
import { setDisplayVal } from "../../redux/actionCreators/setDisplay";
import { type } from "@testing-library/user-event/dist/type";

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFolder = useSelector((state: GlobalTypes) => state.currentFolder);
  const data = useSelector((state: GlobalTypes) => state.fileFolder);

  const typeOfDisplay = useSelector((state: any) => state.setDisplay);
  const [value,setValue]=useState<number>(typeOfDisplay);

  let currentFolderObject = {} as DataTypes;

  const eachRecursive = (obj: DataTypes, id: string) => {
    if (obj.id === id) {
      {
        currentFolderObject = obj;
        return obj;
      }
    }
    for (let iterator in obj.children) {
      eachRecursive(obj.children[iterator], id);
    }
  };

  eachRecursive(data, currentFolder);

  const debounce = (func: Function) => {
    let timer: any;
    return (...args: any) => {
      const context: any = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  }

  const handleOnClick = (link: string) => {
    if (link === "") {
      navigate("/");
      dispatch(setQuery({ query: "", globalState: data }));
      dispatch(changeFolder("root"));
      return;
    }
    dispatch(changeFolder(link));
    navigate("/" + link);
  };

  const handleClickChange = (value: string) => {
    dispatch(setQuery({ query: value, globalState: data }));
  }


  const setVal=(val:number)=>{
    console.log(val);
    dispatch(setDisplayVal(val));
    setValue(val);
     
  }

  const optimizedFn = useCallback(debounce(handleClickChange), []);

  return (
    <div className="nav4444Navbar">
      <div className="nav4444Left">
        <div className="nav4444Breadcrumb">
          {currentFolderObject?.path?.map((item: any, index: number) => (
            <span
              key={index}
              className={`nav4444Breadcrumb${
                index === currentFolderObject.path.length - 1 ? "nav4444active" : ""
              }`}
              onClick={() => handleOnClick(item.link)}
            >
              {item.name} {``}
              {`>  `}
              {` `}
            </span>
          ))}
        </div>
      </div>

      <div className="nav4444imageDiv" >
      <div className="nav4444abc">
        <img className="nav444GridImage " src={sort} />

          <div className="dropdown-content">
            <p>Sort on Name</p>
            <p>Sort on Size</p>
            </div>
        </div>


      <div className="nav4444GridMiddle" >
        

        <img src={grid1} className={`nav444GridImage ${ value == 1 ? "nav4444ActiveDiv" : "" }`} onClick={()=>setVal(1)}  />
        <img src={grid2} className={`nav444GridImage ${ value ==2 ? "nav4444ActiveDiv" : "" }`} onClick={()=>setVal(2)}  />
        <img src={grid4} className={`nav444GridImage ${ value == 4 ? "nav4444ActiveDiv" : "" }`} onClick={()=>setVal(4)}  />


       </div>

      </div>
      <div className="nav4444container">
    
            <div className="nav4444Right">
               

              <input
                type="text"
                className="nav44444Icon nav4444Input fa fa-search"
                placeholder="Search a file/folder"
                onChange={
                  (e) => {
                    optimizedFn(e.target.value);
                  }
                }
              />

              
            </div>
     </div>
      

    </div>
  );
};




export default NavBar;
