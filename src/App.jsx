import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'

import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";




function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  const [showfinished, setshowfinished] = useState(true)



  // ✅ Load todos when app starts
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      settodos(JSON.parse(savedTodos));
    }
  }, []);

  // ✅ Save todos every time they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      // Optional: clear if empty
      localStorage.removeItem("todos");
    }
  }, [todos]);


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")

  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)


  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)

  }

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }


  return (
    <>

      <Navbar />
      <div className="md:container md:mx-auto m-3 rounded-xl p-5 bg-violet-300  min-h-[85vh]  md:w-1/3">

        <h2 className="text-xl md:text-3xl font-bold text-center mb-4 break-all ">itask - Todo Manager</h2>

        <div className='flex mx-1  my-4'>
          <h3 className='font-bold md:text-lg text-base  whitespace-nowrap'>Enter todo:</h3>
          <input onChange={handleChange} value={todo} type="text" className='px-5 py-1 text-sm ml-1  w-full rounded-md ' />
          <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-violet-600 hover:bg-violet-800 disabled:bg-violet-700 text-white  p-3 py-1 block mx-3 rounded-md '>save</button>
        </div>

        <div className=' show-finished text-white flex items-center m4 break-all gap-3 rounded-md px-2 p-1 w-[150px] bg-'>
          <input onChange={toggleFinished} type="checkbox" checked={showfinished} />
          <span className='align-middle break-all' >Show finished</span>
        </div>

      <div className="h-[2px] bg-black opacity-15 w-[85%] mx-auto mt-5">-</div>
        <div className=" mt-3 mx-auto ">

          <h2 className="text-lg font-bold "> Todo List:</h2>

          <div className="todos ">
            {todos.length === 0 && <div className=' font-semibold font-mono text-gray-600'>No todo's to display </div>}
            {todos.map(item => {

              return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 
                ">
                <div className='flex gap-5 break-all'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />

                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>

                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 text-white p-2 py-1 rounded-md mx-1'><MdEditNote /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 text-white p-2 py-1 rounded-md mx-1'><MdDeleteSweep /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
