import React from 'react'
import './Style.css'
export default function Circle({text,radius="50%",background="background-color1"}) {
  return (
<div className="node-container">
  <div className={`node-circle default-node-color ${background}`} style={{borderRadius:radius}}>
    <div className="node-text" title={text}>
      {text}
      </div>
  </div>
  
</div>
  )
}
