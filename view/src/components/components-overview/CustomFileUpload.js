import React from "react";

const CustomFileUpload = props => {
  return (
    <div className="custom-file mb-3 custom-file-admin-dashboard">
      <input
        type="file"
        className="custom-file-input"
        id="customFile2"
        name="fileUpload"
        onChange={e => {
          props.setFile(e.target.files[0]);
        }}
      />
      <label
        className="custom-file-label custom-file-label-for-admin-dashboard"
        htmlFor="customFile2"
      >
        {props.file && props.file.name ? props.file.name : "Choose file..."}
      </label>
    </div>
  );
};

export default CustomFileUpload;
