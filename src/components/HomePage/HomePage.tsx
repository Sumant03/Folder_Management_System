import { useEffect, useState } from "react";
import {useSelector } from "react-redux";


import { DataTypes } from "../../types/Types";
import GridOne from "./GridView/GridOne/GridOne";
import GridTwo from "./GridView/GridTwo/GridTwo";
import GridFour from "./GridView/GridFour/GridFour";

import "./homePage.css";

const HomePage = ({ items,setIsOpen,isOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const typeOfDisplay = useSelector((state: any) => state.setDisplay);
  console.log(typeOfDisplay,"at 26");
  
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    });
  }, [coordinates,typeOfDisplay]);

  return ( 
  <>
       {typeOfDisplay==1&& <GridOne  setIsOpen={setIsOpen} items={items} />}
       {typeOfDisplay==2&& <GridTwo  setIsOpen={setIsOpen} items={items} />}
       {typeOfDisplay==4&& <GridFour setIsOpen={setIsOpen} items={items} />}
  </>
  );
};

type Props = {
  items: DataTypes[];
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;

};

export default HomePage;
