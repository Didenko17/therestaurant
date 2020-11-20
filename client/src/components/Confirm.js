import {useEffect, useState} from 'react'
import {useParams,Redirect} from 'react-router-dom'

const Confirm=()=>{
    const [isConfirmed,setConfirm]=useState(false)
    const {token}=useParams()
    useEffect(()=>{
        fetch(`/api/confirm/${token}`, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
             }
        }).then(res=>{
            console.log(res);
            setConfirm(true)
            return res.json();
        })
    })

    if(isConfirmed){
        return(
            <Redirect to='/api/signin'/>
        )
    }else{
        return(
            <h2>Confirming...</h2>
        )
    }  
}

export default Confirm