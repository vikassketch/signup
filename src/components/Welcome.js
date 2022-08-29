import React from 'react'
import {useState,useEffect} from 'react'
import Task from './Task'

const Welcome = () => {
  const[i,setI]=useState()
    const [tasks,setTasks]=useState([])
    useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks()
          setTasks(tasksFromServer)
      }
    
        getTasks()
      }, [])

     
      const deleteTask=async (id)=>{
        await fetch(`http://localhost:5000/tasks/${id}`,{
          method:"Delete"
        })
        setTasks(tasks.filter((task)=>task.id!==id))
      }

      const addTask=async ()=>{
        var d = new Date();

        var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();

        const res=await fetch(`http://localhost:5000/tasks`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({text:"New Addition",day: datestring})
        })
        const data=await res.json()
        console.log(data)
        setTasks([...tasks,data])
      }
    
     
      const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
    
        return data
      }
  return (
    <div>
       <h3 style={{textAlign:'center' ,color:'rgb(41, 89, 193)'}}>Welcome {sessionStorage.name} </h3>
      <h2 className="header">Tasks<button className='btn1' onClick={addTask}>Add Task</button></h2>
      {/* <p>{tasks[i].name}</p> */}
      
      {tasks.map((task)=><Task key={task.id} task={task} onDelete={deleteTask}/>)}
    </div>
  )
}

export default Welcome