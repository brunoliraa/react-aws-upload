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
          <br />
        <h1>{user.name}</h1>
        <Dropzone />
        <br />
        </div>
      ))}
    </div>
  )

};

function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
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
