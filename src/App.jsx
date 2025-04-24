import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import circle from "./assets/circle.png"
import checked from "./assets/checked.png"

function App() {
  
  const [text, setText] = useState("")
  const [amountOfItems, setAmountOfItems] = useState(0)
  const [todos, addTodoItem] = useState([])
  const [completed, setCompleted] = useState(0)
  const [active, setActive] = useState(0)
  const [, setToggle] = useState(false)


const todosFromStorage = localStorage.getItem("todos")
  
  
  function getTextInfo(value){
    setText(value)
    todos.length === 0 ? addTodoItem([{todo: value, status: "active"}]) : addTodoItem([...todos, {todo: value, status: "active"}])
  }

  function setStatus(todoIndex){
    todos.map((item, index) =>{
      if(index + 1 === todoIndex){
        if(item.status === "active") {
          item.status = "completed"
          setToggle(prev => !prev)
        } else {
          item.status = "active"
          setToggle(prev => !prev)
        }
      }
    })
  }
 
const activeCount = todos.reduce((count, item) => {
  return item.status === "active" ? count + 1 : count;
}, 0);


const completeCount = todos.reduce((count, item) => {
  return item.status === "completed" ? count + 1 : count;
}, 0);


  let todoElements = todos.map((item, index) => {
    return <div key={index + 1} className='todoDiv todo-items'>
        <img src={item.status === "active" ? circle : checked} onClick={() => setStatus(index + 1)}></img>
        {item.status === "active" ? <h2>{item.todo}</h2> : <h2 style={{textDecoration:"line-through"}}>{item.todo}</h2>}
    </div>
  })


  function clearComplete(){
     let array = todos.filter(items =>{ 
       return items.status !== "completed"
     })

     addTodoItem(array)
  }
  
  localStorage.setItem("todos", JSON.stringify(todos))
 

  return (
    <>
      <h1>todos</h1>
      <SearchBar onEnterDown={getTextInfo}/>
      {todoElements}
      <div className='footer-items'>
        <div>
          <p>{activeCount} items left</p>
        </div>
          <div className='active-sorter'>
            <p className='active items'>All</p>
            <p className='items'>Active</p>
            <p className='items'>Completed</p>
          </div>

          <div>
           {completeCount > 0 && <p onClick={clearComplete}>Clear Completed [{completeCount}]</p>}
          </div>
      </div>
    </>
  )
}

export default App
