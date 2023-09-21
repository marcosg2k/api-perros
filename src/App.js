import './style.css';
import {useState, useEffect} from 'react';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [urlImage, setUrlImage] = useState(null);
  const [error, setErrors] = useState(null);
  
  const url_api = "https://dog.ceo/api/breeds/image/random";

  useEffect(()=>{

    if(isLoading){

      async function fetchData(){
        try{
          const response = await fetch("https://dog.ceo/api/breeds/image/random");

          if(response.ok){
            const dog = await response.json();
            setUrlImage(dog.message);
            setErrors(null);
            setIsLoading(false);
          }else{
            setErrors(":( No pudimos traer la imagen del perrito");
          }

        }catch{
          setErrors("Error al traer las mascota solicitada");
        }
      }

      fetchData();
    }
  },[isLoading]);

 
  const RandomDog = ()=>{
    setIsLoading(true);
  }

  if(isLoading){
    return(
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if(error){
    return(
      <div className="App">
        <h1>{error}</h1>
        <button onClick={RandomDog}> Volver a intentar</button>
      </div>
    );
  }

  return (
    <div className="App">
      <img src={urlImage}></img>
      <button onClick={RandomDog}> 
      Dame otro perro
      <span role="img" aria-level="coranzoncito">
        ❤️
      </span>
      </button>
    </div>
  );
}

export default App;
