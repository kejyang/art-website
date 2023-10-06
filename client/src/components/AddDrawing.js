
import React, {useState} from "react";
import axios from "axios";
import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import firebase from "../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




const AddDrawing = () => {

  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  function handleTitleChange(event){
    setTitle(event.target.value)
  }

  function handleDescriptionChange(event){
    setDescription(event.target.value)
  }


  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const storageRef = ref(firebase, `test/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          axios
          .post("/api/v1/drawings", {drawing:{
              picture: downloadURL,
              title: title,
              description: description,
              artist: "test user",
              user_id: 1
            }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error)); 
        });
      }
    );





  }

  return (
    <div className="AddDrawing">
        <form method="post" onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" name="drawing"  onChange={handleFileChange}/>
          <input name="title" placeholder="Title" onChange={handleTitleChange}  />
          <input name="description" placeholder="Description" onChange={handleDescriptionChange} />
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default AddDrawing;