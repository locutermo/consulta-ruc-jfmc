import { useState } from 'react';
import './App.css';

function App() {
  return (    
        <Main/>
  );
}

const Main=()=>{
  const [search,setSearchText] = useState(0)
  const [data,setData] = useState({})
  const [success,setSuccess] = useState(false)
  const onChangeHandler=(e)=>{
    setSearchText(e.target.value)
  } 
  

  const onClickHandler=(e)=>{
      fetch("https://api.migo.pe/api/v1/ruc",
      { method:'POST',
        body: JSON.stringify({
          ruc:search,
          token:'eQObuQveoyUdPLdBpKVXxDK9uYm5eBBY5CsKFF0f0gxvklE0QoGabea5UVuK'
        }),
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"}
      }).then(res=>res.json()).then(json=>{
        setData(json) 
        setSuccess(json.success)
      })
  }
  return(
      <div className="content">    
        <span className="label">RUC</span>
          <div>
            <input className="input-element" type="number" placeholder="Ejmp.20605917217" onChange={onChangeHandler} value={search}></input>
            <button onClick={onClickHandler}>CARGAR</button>
          </div>
          <div>
            {success? <List data={data}/> :null}
          </div>
      </div>
  )
}

const List=({data})=>{
  return(
    <>
      <Row label="Razon social" value={data.nombre_o_razon_social}/>
      <Row label="RUC" value={data.ruc}/>
      <Row label="Condición de domicilio" value={data.condicion_de_domicilio}/>
      <Row label="Estado" value={data.estado_del_contribuyente}/>
      <Row label="Ubigeo" value={data.ubigeo}/>
      <Row label="Dirección" value={data.direccion_simple}/>
      <Row label="Departamento" value={data.departamento}/>
      <Row label="Provincia" value={data.provincia}/>
      <Row label="Actualizado en" value={data.actualizado_en}/>
      <Row label="Estado" value={data.estado_del_contribuyente}/>
    </>
  )
}


const Row=({label,value})=>{
  return(
    <div className="row">
      <div>
        <span>{label}</span>
      </div>
      <div>
        <span>{value}</span>
      </div>
    </div>
  )
}

export default App;
