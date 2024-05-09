
import React from 'react'
import App from './App'
export default class Form extends React.Component {
 
  render() {
    const {onTodoFormSubmit} = this.props
    return( 
    <div>
      <form id='todoForm' onSubmit={this.props.onTodoFormSubmit} >

      <input value={this.props.todoNameInput} 
      onChange={this.props.onTodoChange} 
      type='text' 
      placeholder='Type todo'>

      </input>
    <button type='submit'>
      submit
      </button>
   </form> 
   <button onClick={this.props.toggleDisplayCompleted}>
    {this.props.displayCompleted ? 'Hide' : 'Show'} completed
    </button>
    </div>
    )
}
}
