import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import ApproveDoc from "./ApproveDoc";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectDocStatus = createSelector(
  (state) => state.loggedInUser,
  (loggedInUser) => loggedInUser.myPendings
);
function SingleDoc(props) {
  const [docState, setDocState] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const docs = [{ uri: `${baseUrl}/upload/${props.path}` }];
  console.log(props);
  const docStatus = useSelector(selectDocStatus);

  useEffect(() => {
    docStatus.map((item) => {
      if (item.DocId == props.docId && item.isApproved === false) {
        setDocState(true);
      }
    });
  }, []);

  return (
    <>
      {/* "react-doc-viewer": "^0.1.5", */}
      <div className="doc-viewer mt-5">
        {docState ? <ApproveDoc name={props.path} /> : ""}
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          style={{ width: "75vw", height: "75vh" }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
        />
      </div>
    </>
  );
}

export default SingleDoc;
