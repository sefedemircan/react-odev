import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";



function Arama(props){
  function handleChange(event){
    console.log(event);
    props.onSearch(event);
  }
  return(
    <div>
      <label htmlFor="arama">Ara:</label>
      <input id="arama" type="text" onChange={handleChange}
      value={props.aramaMetni.value}/>
    </div>
    
  )
}

function Yazi(props){
  return(
    <li key={props.yazi.id}>
              <span>
                <a href={props.yazi.url}>{props.yazi.baslik}</a>, 
              </span>
              <span><b>Yazar:</b> {props.yazi.yazar}, </span>
              <span><b>Yorum Sayısı:</b> {props.yazi.yorum_sayisi}, </span>
              <span><b>Puan:</b> {props.yazi.puan}</span>
            </li>
  )
}

function Liste(props) {
  return (
    <ul>
        {props.yazilar.map(function (yazi) {
          return (
            <Yazi key={yazi.id} yazi={yazi}/>
          );
        })}
    </ul>
  );
}

function App() {
  const [aramaMetni,setAramaMetni] = React.
  useState(localStorage.getItem("aranan")||"");
  const yaziListesi = [
    {
      baslik: "React Öğretiyorum",
      yazar: "Sinan",
      yorum_sayisi: 10,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Javascript Öğreniyorum",
      yazar: "Efe",
      yorum_sayisi: 20,
      puan: 10,
      id: 1,
    },
    {
      baslik: "Angular Öğreniyorum",
      yazar: "Melike",
      yorum_sayisi: 5,
      puan: 3,
      id: 2,
    },
    {
      baslik: "Vue.js Öğreniyorum",
      yazar: "Alfonso",
      yorum_sayisi: 13,
      puan: 8,
      id: 3,
    },
    {
      baslik: "Python Öğreniyorum",
      yazar: "Alf",
      yorum_sayisi: 31,
      puan: 9,
      id: 4,
    },
  ];
  const karsilama = {
    baslik: "Merhaba",
    isim: "Efe",
    icerik: { ad: "Web" },
  };

  React.useEffect(()=>{
    localStorage.setItem("aranan",aramaMetni);
  },[aramaMetni]);
  const arananYazilar=yaziListesi.filter(
    function(yazi){
      let baslikarama = yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
      let yazararama = yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase());

      return baslikarama || yazararama;
    }
  );
  function handleSearch(event){
    setAramaMetni(event.target.value);
  }
  return (
    <div>
      <h1>
        {karsilama.baslik} {karsilama.isim}!{" "}
      </h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch}/>
      <p>
        <strong>{aramaMetni} Aranıyor...</strong>
      </p>
      <hr />
      <Liste yazilar={arananYazilar} />
    </div>
  );
}

export default App;
