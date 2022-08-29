import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({show}) => {
    const navigate=useNavigate()
  
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[err,setErr]=useState('')
    const[error,setError]=useState({
        email:'',
        password:''
    })

    const loginUser=(e)=>{
        e.preventDefault()
        let reg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let reg1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        if(!email||!password){
           setErr('All fields are mandatory')
           return;
        }
        // console.log(reg.test('Vikas@gmail.com'))
        if(!reg.test(email)){
            
            setErr('')
            setError({...error,password:'',email:'Enter valid Email'})
            
            return;
        }
        if(!reg1.test(password)){
            setError({...error,email:'',password:'Password should be 8-15 digits long,should contain 1 special,uppercase,digit,lowercase'})
            return;
        }
        setError('')
            const user={email:email,password:password}
            let Users=[]
            if(localStorage.getItem("Users")===null){
                setErr('Sign Up First')
                return;
            }
            else{
                setErr('')
                Users=JSON.parse(localStorage.getItem("Users"))
                
                
                let bool=false
                let i=0
                for (i; i < Users.length; i++) {
                    
                    if (user.email === Users[i].email) {

                        if (user.password === Users[i].password){
                            bool = true
                            sessionStorage.setItem('name', Users[i].name)
                        }
                        break
                    }
                }
                if(bool===false){
                    setErr("Password and Email does not match.")
                    return;
                }
                else{
                    setErr('')
                    console.log("ok")
                    sessionStorage.setItem("index",i)
                    localStorage.setItem("isLogin",true)
                    navigate("/welcome")
                    // localStorage.setItem("isLogin",false)
                    
                }
            }
        
    }
  return (
    <div>
    <h2 className="header">Log In to your World</h2>
    
        
        <form className='add-form' onSubmit={loginUser}>
        {err && <p style={{color:'red',fontSize:'13px'}}>{err}</p>}
        <div className='form-control'>
                <label>Email</label>
        <input type='text' value={email}  placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
        {error.email && <p style={{color:'red',fontSize:'13px'}}>{error.email}</p>}
        </div>
        <div  className='form-control'>
             <label>Password</label>
        <input type='password' value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
        {error.password&& <p style={{color:'red',fontSize:'13px'}}>{error.password}</p>}
        </div>
        <div className='fl'>
        <input type='submit' value='Log In' className='btn'/>
        </div>
        </form>
    </div>
  )
}

export default Login