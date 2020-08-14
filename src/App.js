import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import api from './service/api';
import {useDropzone} from 'react-dropzone'

const Users = () =>{

  const [user, setUser] = useState([]);
  
  const findUsers= () =>{
    api.get('/item').then(res =>{
      // console.log(res);
      setUser(res.data);
    });
  };
  useEffect(() => {
    findUsers();
  }, []);
  return (
    <div>
      {user.map(user =>(
        <div key={user.id}>
          {user.id ? (
           <img src={`http://localhost:8080/api/v1/user/${user.id}/image/download`}></img> 
           ) : null}
          <br />
        <h1>{user.name}</h1>
        <Dropzone userId = {user.id}/>
        <br />
        </div>
      ))}
    </div>
  )

};

function Dropzone( userId ) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const form = new FormData();
    form.append("file", file);
    
    api.post(`/api/v1/user/${userId}/image/upload`, form,
    {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }
    ).then(()=>{
      console.log("file uploaded with success")
    }).catch(error =>{
      console.log(error)
    });

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag and drop the image here, or click to select files</p>
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
