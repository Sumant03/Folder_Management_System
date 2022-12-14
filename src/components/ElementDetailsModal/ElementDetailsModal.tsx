import { DataTypes } from "../../types/Types";

import "./elementDetailsModal.css";

const DetailsModal = ({ setIsOpen, item }: propTypes) => {
  return (
    <>
      <div onClick={() => setIsOpen(false)} />
      <div className="centered"  >
        <div className="modal">
          <div className="modalHeader">
            <h4 className="heading">Details</h4>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="modalContent">
            <div className="row">
              <div className="column">
                <div className="left">Name</div>
                <div className="right">{item.name.slice(0, 8)}</div>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="left">Exact Type</div>
                <div className="right">
                  {item.type?.length == 0 ?( <p>Common</p>) : (<p>{item.type}</p>)}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Created on</div>
                <div className="right">{item.createdAt}</div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Creator</div>
                <div className="right">
                  {item.creator.length == 0 ? (
                    <>Guest User</>
                  ) : (
                    <p>{item.creator}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

type propTypes = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: DataTypes;
};

export default DetailsModal;
