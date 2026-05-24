import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Flip, Bounce, Zoom } from 'react-toastify'

import { getDatabase, ref, set, push, onValue, remove, update
} from "firebase/database";

const Form = () => {

  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [editId, setEditId] = useState("")

  const db = getDatabase()

  // INPUT CHANGE
  const handlechange = (e) => {
    setTask(e.target.value)
  }

  // GET DATA
  useEffect(() => {

    const taskRef = ref(db, "ToDoName")

    onValue(taskRef, (message) => {

      let arr = []

     message .forEach((item) => {

        arr.push({
          id: item.key,
          ...item.val()
        })

      })

      setTaskList(arr)

    })

  }, [])

  // ADD & UPDATE
  const handleclick = async (e) => {

    e.preventDefault()

    if (task == "") {

      toast.error('Please Enter Your Task', {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        transition: Zoom,
      })

    } else {

      // UPDATE
      if (editId) {

        await update(ref(db, `ToDoName/${editId}`), {
          ToDoName: task
        })

        toast.success("Task Updated",{
           position: "top-right",
        autoClose: 1000,
        theme: "colored",
        transition: Zoom,
      })

        setEditId("")

      } else {

        // ADD
        const newTaskRef = push(ref(db, "ToDoName"))

        await set(newTaskRef, {
          ToDoName: task
        })

        toast.success("Task Added",{
           position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Flip,
      })

      }

      setTask("")
    }
  }

  // DELETE
  const handleDelete =  (id) => {

     remove(ref(db, `ToDoName/${id}`))

    toast.success("Task Deleted",{
       position: "top-right",
        autoClose: 1000,
        theme: "dark",
         transition: Bounce,
    })

  }

  // EDIT
  const handleEdit = (item) => {

    setTask(item.ToDoName)

    setEditId(item.id)

  }

  return (

    <div className='bg-[url(./assets/messi.jpg)] min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-10'>

      <ToastContainer />

      <h1 className='text-5xl text-center mb-12 text-white font-bold'>
        Messi fanbase #LM10
      </h1>

      <form className="max-w-sm mx-auto bg-blue-200/30 px-10 py-10 text-white rounded-xl">

        <div className="mb-5">

          <label className=" mb-2 text-lg font-bold">
            Enter your Task
          </label>

          <input
            type="text"
            value={task}
            onChange={handlechange}
            className="rounded-xl text-white  w-full px-3 py-2"
            placeholder="Task"
          />

        </div>

        <button
          type="submit"
          onClick={handleclick}
          className="text-black bg-white hover:bg-blue-300 hover:text-white rounded-xl px-4 py-2"
        >
          {editId ? "Update Task" : "Submit"}
        </button>

      </form>

      {/* SHOW TASK */}

      <div className='max-w-sm mx-auto mt-10'>

        {
          taskList.map((item) => (

            <div
              key={item.id}
              className='bg-white p-4 rounded-xl mb-4 flex justify-between items-center'
            >

              <h2 className='text-black font-bold'>
                {item.ToDoName}
              </h2>

              <div className='flex gap-2'>

                <button
                  onClick={() => handleEdit(item)}
                  className='bg-blue-500 text-white px-3 py-1 rounded-lg'
                >
                  Edit
                </button>

                <button  onClick={() => handleDelete(item.id)}  className='bg-red-500 text-white px-3 rounded-lg'>
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Form
