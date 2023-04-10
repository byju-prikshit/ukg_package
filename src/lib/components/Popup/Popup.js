import React from 'react'
import './Styles.css'
import { Button } from 'antd'

export default function Popup(props) {
  return ((props.trigger)?
    <div className='popup'>
        <div className='popup-inner ' style={{width:'100%',padding:'1rem'}}>
        <div style={{display:'flex',justifyContent:'end'}}> <Button type="primary" onClick={()=>props.setTrigger(false)}>Close</Button></div>
      {props.children}
      </div>
    </div>:""
  )
}
