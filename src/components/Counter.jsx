import React, { useState, useEffect, Fragment } from 'react'
import style from './assets/Counter.module.css'

export const Counter = ({ setName, name, setNum }) => {

    useEffect(() => {
        setName(prompt('Ingresa un nombre para el contador'))
    }, [])

    const [count, setCount] = useState(0)

    const add = () => {
        count !== 20 && setCount(count+1);
    }

    const subtract = () => {
        count !== 0 && setCount(count-1);
    }

    useEffect(() => {
        setNum(count)
    }, [count])

    const counter = (
        <div className={style.container}>
            {/* <p>{name}</p> */}
            <button className={style.menos} onClick={()=> subtract()}>-</button>
            <p className={style.number}>{count}</p>
            <button className={style.mas} onClick={()=> add()}>+</button>
        </div>
    )

  return (
    <Fragment>
        {counter}
    </Fragment>
  )
}
