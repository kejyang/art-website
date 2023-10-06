import React, {useState} from "react";
import axios from "axios";
import firebase from "../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddTagDrawing = () =>{

  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [ids, setIds] = useState([0,0])


  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  function handleTitleChange(event){
    setTitle(event.target.value)
  }

  function handleDescriptionChange(event){
    setDescription(event.target.value)
  }

  function handleTagChange(event) {
    setTag(event.target.value);
  }

  function handleTagSubmit(event) {
    event.preventDefault();
    setTags([...tags, tag]);
  }

/*   async function uploadImage() {
    const filename = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
    return fileUrl;
  }

  async function uploadDrawing(fileUrl) {
    axios
    .post("/api/v1/drawings", {drawing:{
      picture: fileUrl,
      title: title,
      description: description,
      artist: "test user",
      user_id: 1
      }
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error)); 
  } */

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
          
          /* axios
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
            setIds([response.data.id, 0]);
            for(let i = 0; i < tags.length; i++){
              axios
              .post("/api/v1/tags", {tag:{
                  tag: tags[i],
                  picture: "testpicture"
                }
              })
              .then((response) => {
                console.log(response);
                setIds([...ids, response.data.id]);
                console.log(response.data.id);
                console.log(ids);
                axios
                .post("/api/v1/tag_drawings", {tag_drawing:{
                    tag_id: ids[1],
                    drawing_id: ids[0],
                    title: "test"
                  }
                })
                .then((response) =>{
                  console.log(response);
                })
                .catch((error) => console.log(error)); 
              })
              .catch((error) => console.log(error));  
            }
          })
          .catch((error) => console.log(error));  */
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
          <h1>React Tag Upload</h1>
            <input name="tag" placeholder="type tag here" onChange={handleTagChange}/>
              <button  onClick={handleTagSubmit}>Add Tag</button>
          <button type="submit">Upload</button>
        </form>
        <div>
          {tags.map((x)=>(
            <li key={x}>{x}</li>
          ))}
        </div>
    </div>
  );
} 
export default AddTagDrawing;