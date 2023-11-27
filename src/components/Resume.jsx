import React, { useState} from "react";
import AWS from "aws-sdk";
import axios from "axios";

function Resume() {
  const [file, setFile] = useState(null);
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  if(file != null) {
    let fileName = localStorage.getItem("username")+".pdf";
    const bucketName = 'emptotbucket';

    AWS.config.update({ region: 'us-east-1', credentials: new AWS.Credentials( 'AKIA3HR7UMMSYYTC36X3', 'v6KRlwG7uYdtnmkXKCPiQ0wLCnoMpHfMXUe0ghem')});

    let upload_params = {apiVersion: "2006-03-01",Bucket: bucketName, Key: fileName, Body: file};
    let upload = new AWS.S3.ManagedUpload({params: upload_params});
    let promise = upload.promise();
    promise.then(
        function(data){
          // console.log("Successfully uploaded:", fileName);
          let resumepath=data.Location
          const parts = resumepath.split(".com", 2);
          localStorage.setItem("resumepath",parts[0])
        },
        function(err){console.log("Failed to upload", file.name, "with error:", err.message);}
    ); 
    setFile(null)
  }

  return (
      <input type="file" className="col-7" onChange={handleFileChange} />
  );
}

export default Resume;
