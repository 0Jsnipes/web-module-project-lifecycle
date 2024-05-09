import React from 'react'
import Todo from '../components/Todo'
export default class TodoList extends React.Component {


  render() {
    return (
      <div id='todos'>
      <h2>Todos:</h2>
      {
       this.props.Todos.reduce((acc, td) => {
       if (this.props.displayCompleted || !td.completed) return acc.concat(
        <Todo 
        key = {td.id}
        toggleCompleted = {this.props.toggleCompleted}
        Todo = {td}

        
        />
       )
         return acc 
       }, [])
       
      }
      </div>
    )
  }
}
