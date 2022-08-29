import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = ({show}) => {
    const navigate=useNavigate()
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[phone,setPhone]=useState('');
    const[err,setErr]=useState('')
    
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo: ''
    })
   

    const submitUser=(e)=>{
        e.preventDefault()
        let reg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let reg1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        

        if(name.trim() === ''){
            setError({...error ,phoneNo:'',email:'',password:'', name: 'Please enter name.'})
            return;
        }
        if(!reg.test(email)){
            setError({...error,name:'',phoneNo:'',password:'',email:'Enter valid Email'})
            return;
        }
        
        if(phone.length !== 10){
            setError({...error , email : '' , name:'',password:'',phoneNo: 'Please enter a 10 digit phone number.'})
            return;
        }
        if(!reg1.test(password)){
            setError({...error,phoneNo:'',email:'',name:'',password:'Password should be 8-15 digits long,should contain 1 special,uppercase,digit,lowercase'})
            return;
        }

        setError({...error , name : '' , phoneNo: '',email:'',password:''})
        const user={name:name,email:email,phone:phone,password:password}
        let users=!localStorage.getItem('Users')?[]:JSON.parse(localStorage.getItem('Users'))
        let bool=false
        for(let i=0;i<users.length;i++){
            if(user.email===users[i].email){
                bool=true
                break
            }
        }
        if(bool===true){
           setErr('Email already exists')
        }
        else{
            setErr('')
            users.push(user)
            localStorage.setItem('Users',JSON.stringify(users))
            setName('')
            setEmail('')
            setPassword('')
            setPhone('')
            console.log("ok")
            sessionStorage.setItem('auth',true)
            navigate("/login")
        }
        

  
    }
  return (
    
    <div id='signup'> 
         
         <h2 className="header">Sign Up </h2>
        
        <form className='add-form' >
            {err&&<p style={{color:'red',fontSize:'13px'}}>{err}</p>}
          
            <div className='form-control'>
                <label>Name</label>
        <input type='text' value={name}  placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}/>
        {error.name && <p style={{color:'red',fontSize:'13px'}}>{error.name}</p>}
        </div>
        <div  className='form-control'> 
            <label>Email</label>
        <input type='email' value={email}  placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
        {error.email && <p style={{color:'red',fontSize:'13px'}}>{error.email}</p>}
        </div>
       
       <div  className='form-control'>
        <label>Phone</label>
        <input type='tel' value={phone} placeholder='[0-9]{10}'  onChange={(e)=>setPhone(e.target.value)}/>
        {error.phoneNo && <p style={{color:'red',fontSize:'13px'}}>{error.phoneNo}</p>}

        </div>
       
        <div  className='form-control'>
             <label>Password</label>
        <input type='password' value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
        {error.password && <p style={{color:'red',fontSize:'13px'}}>{error.password}</p>}
        </div>
       
       <div className='fl'>
      <button onClick={submitUser} className='btn'>  Sign Up</button>
        </div>
        </form>
    </div>
    
    
   
  )
}

export default SignUp;