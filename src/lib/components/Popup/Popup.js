import React from 'react'
import './Styles.css'
import { Button } from 'antd'

export default function Popup({trigger,setTrigger,children}) {
  return ((trigger)?
    <div className='popup'>
        <div className='popup-inner ' style={{width:'100%',padding:'1rem'}}>
        <div style={{display:'flex',justifyContent:'end'}}> <Button type="primary" onClick={()=>setTrigger(false)}>Close</Button></div>
      {children}
      </div>
    </div>:null
  )
}
