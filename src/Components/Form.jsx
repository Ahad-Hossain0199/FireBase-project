import React, { useState } from 'react'
import messi from '../assets/messi.jpg'
import { ToastContainer, toast,Flip } from 'react-toastify';
import { getDatabase, ref, set , push } from "firebase/database";

const Form = () => {

  const [task,setTask] = useState ("")
   const [error,seterror] = useState ("")

  const handlechange = (e) => {
     setTask (e.target.value)
  }

  const handleclick = (e) => {
     e.preventDefault()
     if(task =="") {
      toast.error('Please Enter Your Task', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
});
   }else {
   const db = getDatabase();
     set(push(ref(db,"/ToDoName"),{
      ToDoName: task
     }))
   }
  }
  return (
    <div className='bg-[url(./assets/messi.jpg)] opacity-90  bg-cover bg-center bg-no-repeat p-100'>
      <ToastContainer/>
      <h1 className='text-5xl text-center  mb-12 text-white font-bold '>Messi fanbase #LM 10</h1>
<form className="max-w-sm mx-auto bg-blue-300/50 px-20 py-20 text-white rounded-xl ">
  <div className="mb-5 ">
    <label htmlFor="text" className="block mb-2.5 text-sm font-medium text-heading">Enter your Task</label>
    <input type="text" id="text" onChange={handlechange} className=" rounded-2xl border border- default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Task"  />
  </div>
 

  <button type="submit" onClick={handleclick} className="text-black bg-white box-border border border-transparent hover:bg-blue-300 hover:text-white focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl  px-4 py-2.5 ">Submit</button>
</form>
      

    </div>
  )
}

export default Form

