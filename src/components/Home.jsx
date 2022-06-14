import React, { useState, useEffect } from "react";
import { Counter } from './Counter.jsx'
import style from './assets/Home.module.css'
import icon from './assets/icon.svg'

export const Home = () => {
  const [listCounter, setListCounter] = useState(0)
  const [counters, setCounters] = useState([])
  const [name, setName] = useState('')
  const [filter, setFilter] = useState('a-z')
  const date = new Date()

  const fun = (e) =>{
    setFilter(e.target.value)
  }

  const addCount = () => {
    listCounter < 20 && setListCounter(listCounter + 1);
    setCounters([...counters, {index: listCounter, id: date, component: (<Counter key={listCounter} setName={setName}/>)}])
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

    // counters.filter(counter => counter !== !counter.name)

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

  const filterBy = () => {
    if (filter === 'a-z'){
      counters.sort((first, second) => first.name.localeCompare(second.name));
      setCounters(counters.filter(counter => counter))
    }
    if (filter === 'z-a'){
      counters.sort((first,second)=> second.name.localeCompare(first.name));
      setCounters(counters.filter(counter => counter))
    }
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
          <button className={style.delete} onClick={() => borrar(counter.id)}>
            <img className={style.img} src={icon} alt='basurero para eliminar el contador' />
          </button>
        </li>)
    })

  return (
    <div>
      <div className={style.header} >
        <p className={style.orden} > Ordenar por nombre: </p>
        <select value={filter} onChange={fun}>
          <option value='a-z'>A - Z</option>
          <option value='z-a'>Z - A</option>
        </select>
        <button className={style.ordenar} onClick={()=> filterBy()}>Ordenar</button>
        <button className={style.limpiar} onClick={()=> filterByDefault()}>Limpiar orden</button>
      </div>
      {(listCounter < 20 && listCounter > 0) && <button className={style.agregar} onClick={() => addCount()}>Agregar contador</button>}
      {listCounter === 0 && <button className={style.inicial} onClick={() => addCount()}>Comienza agregando un contador</button>}
      <ul className={style.container}>
        {countersRender}
      </ul>
    </div>
  );
}
