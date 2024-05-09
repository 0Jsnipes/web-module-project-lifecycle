import React from 'react'
import axios from 'axios'
import Form from '../components/Form'
import TodoList from '../components/TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    Todos: [],
    error: '',
    todoNameInput:'',
    displayCompleted:true,
  }
onTodoChange = evt => {
  const { value }= evt.target
  this.setState({...this.state, todoNameInput: value})
}
resetForm = () => this.setState({ ...this.state, todoNameInput: ''})
postNewTodo = ()=> {
  axios.post(URL, {name: this.state.todoNameInput })
  .then(res => {
    this.setState({...this.state, Todos: this.state.Todos.concat(res.data.data) })
    this.fetchAllTodos()
    this.resetForm()
  })
  .catch(err =>{
    this.setState({...this.state, error: err.response.data.message})
  })
}
onTodoFormSubmit = evt => {
  evt.preventDefault()
  this.postNewTodo()
}
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, Todos: res.data.data})
      })
      .catch(err =>{
        this.setState({...this.state, error: err.response.data.message})
      })
  }
  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, Todos: this.state.Todos.map(td=> {
          if(td.id !== id) return td
          return res.data.data
        })})
      })
      .catch(err =>{
        this.setState({...this.state, error: err.response.data.message})
      })
  }
  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted : !this.state.displayCompleted})
  }
 
  componentDidMount(){
this.fetchAllTodos()
}

  render() {
    return (
      <div>
        <div id = 'error'>Error: {this.state.error}</div>
        <div id='todos'>
       <h2>Todos:</h2>
       {
        this.state.Todos.reduce((acc, td) => {
        if (this.state.displayCompleted || !td.completed) return acc.concat(<div onClick={this.toggleCompleted(td.id)} key = {td.id}>{td.name}{td.completed ? '✓':''} </div>)
          return acc 
        }, [])
        
       }
       </div>
    <Form 
    onTodoFormSubmit ={this.onTodoFormSubmit}
    onTodoChange = {this.onTodoChange}
    todoNameInput = { this.state.todoNameInput}
    toggleDisplayCompleted = {this.toggleDisplayCompleted}
    displayCompleted = {this.state.displayCompleted}
    />
      </div>
    )
  }
}
