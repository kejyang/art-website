import React, {useState} from "react";
import axios from "axios";
import firebase from "../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth0 } from "@auth0/auth0-react";

const AddTagsDrawings = () =>{

  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const { user, isAuthenticated} = useAuth0();

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

  async function uploadImage() {
    const filename = new Date().getTime() + file.name
    const storageRef = ref(firebase, `test/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    let fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
    return fileUrl; 
  }

  async function uploadDrawing(fileUrl) {
    const response = await axios
    .post("/api/v1/drawings", {drawing:{
      picture: fileUrl,
      title: title,
      description: description,
      artist: user.email,
      user_id: 1
      }
    })
    .catch((error) => console.log(error)); 

    return response.data;
  } 

  async function uploadTag(fileUrl){
    let responseArr = [];
    for(let i = 0; i < tags.length; i++){
      const response = await axios
      .post("/api/v1/tags", {tag:{
          tag: tags[i],
          picture: fileUrl
        }
      })
      .catch((error) => console.log(error)); 
      responseArr.push(response.data);
    }
    console.log(responseArr);
    return responseArr;
  }

  async function uploadTagDrawing(tag_id, drawing_id){
    axios
    .post("/api/v1/tag_drawings", {tag_drawing:{
          tag_id: tag_id,
          drawing_id: drawing_id,
          title: title
        }
      })
      .then((response) =>{
        console.log(response);
      })
      .catch((error) => console.log(error)); 
  }

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    let fileUrl = await uploadImage();
    const [drawingUploadRes, tagUploadResArr] = await Promise.all([
      uploadDrawing(fileUrl),
      uploadTag(fileUrl)
    ]);  
    for(let i = 0; i < tagUploadResArr.length; i++){
      uploadTagDrawing(tagUploadResArr[i].id, drawingUploadRes.id); 
    }
    
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
export default AddTagsDrawings;