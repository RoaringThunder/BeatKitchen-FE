import { React } from "react";
import "src/css/Loader.css";

function Loader() {
  return (
    <>
      <div className="loader-container">
        {/* <div className="vinyl-record-loader">
          <div className="vinyl-record-texture">
            <div className="vinyl-label">
              <div className="vinyl-hole" />
            </div>
          </div>
        </div> */}

        <div className="cd-loader">
          <div className="cd-texture">
            <div className="cd-label">
              <div className="cd-hole" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;
