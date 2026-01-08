'use client'
import React, { useState } from 'react'
const Page = ({}) => {
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:""
    });
    const handleSubmit=async (e)=>{
    e.preventDefault();
        try {
        const res = fetch('/api/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    }
  return (
    <>
    <form action="">
        <input type="text" placeholder="Username" onChange={(e)=> setValues({...values, name:e.target.value})}/>
        <input type="text" placeholder="Email" onChange={(e)=> setValues({...values, email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=> setValues({...values, password:e.target.value})}/>
        <button onClick={handleSubmit}>Login</button>
    </form>
    </>
  )
}

export default Page