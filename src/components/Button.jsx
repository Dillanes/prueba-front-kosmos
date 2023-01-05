import React from 'react'
import style from './button.module.css'
function Button({msg,color,Action}) {
  return (
    <div className={style.container} >
        <button onClick={Action} className={style.button} style={{backgroundColor:color}}>{msg}</button>    
    </div>
  ) 
}

export default Button