import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "./GlobalState";

function SearchproductItem({ item }) {
  const { mode } = useContext(GlobalStateContext);
  const byteArray = item?.image?.data?.data; // Access the array of bytes

  // Only proceed if byteArray exists
  let base64String = '';
  if (byteArray) {
      base64String = btoa(
          new Uint8Array(byteArray)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
  }

  // Construct the data URL
  const imageUrl = base64String ? `data:${item?.image?.contentType || 'image/png'};base64,${base64String}` : null;
 

  const btnclr = item.postType === "post" ? "success" : "warning";

  return (
    <div
      className={
        "card mb-3 justify-content-start shadow mx-auto  my-3 text-bg-" + mode
      }
      style={{ width: "800px" }}
    >
      {/* badge */}
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
        {item.postType}
      </span>

      <div className="row g-0">
        <div className="col-md-4 p-2 border m-auto ">
          <img
            src={imageUrl}
            style={{ width: "120px", height: "140px" }}
            className="img-fluid rounded-center m-2 
      "
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-start">{item.itemName}</h5>
            <p className="card-text text-start">{item.division}</p>
            <p className="card-text text-start w-25 text-center rounded-pill bg-danger text-white">Reward {item.rewardAmount} 	&#2547;</p>
            <p className="card-text">
              <small className="text-body-secondary">
                {"Posted : " + item.foundDateTime}
              </small>
            </p>
            {/* Wrapping the entire button in Link */}
            {item.postType === "post" ? (
              <Link to={`/claim?id=${item._id}`}>
                <button type="button" className={"btn btn-" + btnclr}>
                  Claim
                </button>
              </Link>
            ) : (
              <Link to={`/found?id=${item._id}`}>
                <button type="button" className={"btn btn-" + btnclr}>
                  Found
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchproductItem;
