import React from 'react'

export default class Todo extends React.Component {


  render() {
    return( 
    <div 
    onClick={this.props.toggleCompleted(this.props.Todo.id)} 
    >
    {this.props.Todo.name}{this.props.Todo.completed ? '✓':''} 
    </div>
    )
  }
}
