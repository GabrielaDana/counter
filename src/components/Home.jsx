import React, { useState, useEffect } from "react";
import { Counter } from './Counter.jsx'
import style from './assets/Home.module.css'

export const Home = () => {
  const [listCounter, setListCounter] = useState(0)
  const [counters, setCounters] = useState([])
  const [name, setName] = useState('')
  const [num,setNum] = useState(0)
  const date = new Date()

  const addCount = () => {
    listCounter < 20 && setListCounter(listCounter + 1);
    setCounters([...counters, {index: listCounter, id: date, num: num, component: (<Counter key={listCounter} setName={setName} name={name} setNum={setNum}/>)}])
  }

  useEffect(() => {

   counters.map((counter, i) => {
      if (i === listCounter-1){
        if(name === null || name === undefined){
          counter.name = ''
        }
        else counter.name = name;
      } 
    });

    counters.filter(counter => counter !== !counter.name)

    setCounters(counters.filter(counter =>{
      return (counter.name !== '')
    }));

    setListCounter(counters.length)
    console.log(counters)
  }, [name])
  

  const borrar = (i) => {
    setCounters(counters.filter(counter => counter.id !== i))
    setListCounter(listCounter -1)
  }
  
  const filterByName = () => {
    counters.sort((first, second) => first.name.localeCompare(second.name));
    setCounters(counters.filter(counter => counter))
  }

  const filterByName2 = () =>{
    counters.sort((first,second)=> second.name.localeCompare(first.name));
    setCounters(counters.filter(counter => counter))
  }

  const filterByDefault = () =>{
    counters.sort((a,b) => a.id - b.id);
    setCounters(counters.filter(counter => counter))
  }

    const countersRender = counters.map(counter => {
      return (
        <li className={style.lista} key={counter.id}>
          <p className={style.name}>{counter.name}</p>
          <div>{counter.component}</div>
          <button className={style.delete} onClick={() => borrar(counter.id)}>delete</button>
        </li>)
    })

  return (
    <div>
      {listCounter < 20 && (<button onClick={() => addCount()}>Agregar contador</button>)}
      <button onClick={()=> filterByDefault()}>Default</button>
      <button onClick={() => filterByName()}> Filtrar A-Z </button>
      <button onClick={() => filterByName2()}> Filtrar Z-A </button>
      <ul className={style.container}>
        {countersRender}
      </ul>
    </div>
  );
}
