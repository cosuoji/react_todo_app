import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import circle from "./assets/circle.png"
import checked from "./assets/checked.png"

function App() {
  
  const [text, setText] = useState("")
  const [todos, addTodoItem] = useState([])
  const [activeTodos, setActiveTodos] = useState([])
   const [completedTodos, setCompletedTodos] = useState([])
  const [, setToggle] = useState(false)
  const [currentStatus, setCurrentStatus] = useState("all")
  const [allToggle, setAllToggle] = useState(false)
  const [actToggle, setActToggle] = useState(false)
  const [completedToggle, setCompleted] = useState(false)
  
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


let allElements = todos.map((item, index) => {
    return <div key={index + 1} className='todoDiv todo-items'>
        <img src={item.status === "active" ? circle : checked} onClick={() => setStatus(index + 1)}></img>
        {item.status === "active" ? <h2>{item.todo}</h2> : <h2 style={{textDecoration:"line-through"}}>{item.todo}</h2>}
    </div>
  })

let activeElements = activeTodos.map((item, index) => {
    return <div key={index + 1} className='todoDiv todo-items'>
        <img src={item.status === "active" ? circle : checked} onClick={() => setStatus(index + 1)}></img>
        {item.status === "active" ? <h2>{item.todo}</h2> : <h2 style={{textDecoration:"line-through"}}>{item.todo}</h2>}
    </div>
  })

let completedElements = completedTodos.map((item, index) => {
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
 
  function displayAll(value){
      setActToggle(false)
      setCompleted(false)
      setAllToggle(!allToggle)
      setTodos(todos)
  }

  function displayAct(value){
    setCompleted(false)
    setAllToggle(false)
    setActToggle(!actToggle)
    setCurrentStatus(value)
    let array = todos.filter(items => items.status === value)
    setActiveTodos(array)
  }

  function displayCompleted(value){
    setActToggle(false)
    setAllToggle(false)
    setCompleted(!completedToggle)
    setCurrentStatus(value)
    let array = todos.filter(items => items.status === value)
    setCompletedTodos(array)
  }

  return (
    <>
      <h1>todos</h1>
      <SearchBar onEnterDown={getTextInfo}/>
      {completedToggle ? completedElements : actToggle ? activeElements : allElements}
      {todos.length > 0 &&  <div className='footer-items'>
        <div>
          <p>{activeCount} item(s) left</p>
        </div>
          <div className='active-sorter'>
            <p className={`items ${allToggle ? `active` : null}`} onClick={() => displayAll("all")}>All</p>
            <p className={`items ${actToggle? `active` : null}`} onClick={() => displayAct("active")}>Active</p>
            <p className={`items ${completedToggle ? `active` : null}`} onClick={() => displayCompleted("completed")}>Completed</p>
          </div>
          <div>
           {completeCount > 0 && <p onClick={clearComplete}>Clear Completed [{completeCount}]</p>}
          </div>
      </div>}
    </>
  )
}

export default App
