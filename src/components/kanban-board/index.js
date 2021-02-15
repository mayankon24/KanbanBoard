import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [

      ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

    this.inputRef = React.createRef();

  }

v

  handleClick = (e) => {
    if (this.inputRef.current.value) {
      let tempState = this.state.tasks
      const alreadyExist = tempState.find(i => i.name === this.inputRef.current.value)
      if (!alreadyExist) {
        tempState.push({ name: this.inputRef.current.value, stage: 0 })
        this.setState({ tasks: [...tempState] });
      }
    }
  }

  deleteTask = (e, taskName) => {
    if (taskName) {
      let tempState = this.state.tasks
      const result = tempState.filter(i => i.name !== taskName)
      this.setState({ tasks: [...result] });
    }
  }

  moveFordward = (e, taskName, stage) => {
    if (taskName) {
      let tempState = this.state.tasks
      const result = tempState.filter(i => i.name !== taskName)
      result.push({ name: taskName, stage: stage + 1 })
      this.setState({ tasks: [...result] });
    }
  }

  movebackward = (e, taskName, stage) => {
    if (taskName) {
      let tempState = this.state.tasks
      const result = tempState.filter(i => i.name !== taskName)
      result.push({ name: taskName, stage: stage - 1 })
      this.setState({ tasks: [...result] });
    }
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input ref={this.inputRef} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={(e) => this.handleClick(e)}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                              {task.stage != 0 && <i className="material-icons" onClick={(e)=>this.movebackward(e, task.name, task.stage)}>arrow_back</i>}
                            </button>
                            <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                              {task.stage < 3 && <i className="material-icons" onClick={(e)=>this.moveFordward(e, task.name, task.stage)}>arrow_forward</i>}
                            </button>
                            <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                              <i className="material-icons" onClick={(e) => this.deleteTask(e, task.name)}>delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}