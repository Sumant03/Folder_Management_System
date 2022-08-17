import endResultImage from "../../images/endResult.svg";

import "./noSearchFound.css";

const CantFind = () => {
  return (
    <div className="cf200Container">
      
      <img src={endResultImage} alt="endPic" className="cf200EndPic " />
      <h3>Oops...! Couldn't Find Anything</h3>
    </div>
  );
};

export default CantFind;
