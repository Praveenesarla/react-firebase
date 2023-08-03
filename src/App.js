import "./App.css";
import React, { useEffect, useState } from 'react';

import { Auth } from "../src/components/auth";
import {db, auth, storage} from "./config/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";


const App = () => {

  const [newMovieTitle, setMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setNewMovieOscar] = useState(false) ;
  const [movieList, setMovieList] = useState([])

  const [updatedTitle, setUpdatedTitle] = useState("")

  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db,"movies")

  const getMovieList = async () =>{
    try{
    const  data = await getDocs(movieCollectionRef);
    const filteredData = data.docs.map((doc)=> ({
      ...doc.data(),
      id : doc.id,
    }))
    setMovieList(filteredData);
    console.log(filteredData);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [movieList]);

  const onSubmitMovie = async() =>{
    try{
    await addDoc(movieCollectionRef,{title : newMovieTitle, releaseDate : newReleaseDate, recievedAnOscar : isNewMovieOscar, userId : auth?.currentUser?.uid,})
    getMovieList();
    }catch(err) {
      console.error(err);
    }
  }
 
  const deleteMovie = async (id) =>{
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  }

   const updateMovieTitle = async (id) =>{
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title : updatedTitle});
  }

  const uploadFile = async () =>{
    if (!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try {
    await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div>
      <Auth/>
      <div>
        <input placeholder="title" onChange={(e) => setMovieTitle(e.target.value)}/>
        <input placeholder="Release Date" onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <input type="checkbox" onChange={(e) => setNewMovieOscar(e.target.checked)}/>
        <label>receiving Osacr</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie)=>(
          <div >
            <h1 style={{color : movie.recievedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder="new title..." onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
           </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}
export default App