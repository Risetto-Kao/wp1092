import React, { Component } from "react";
import Header from "../components/Header";
import Item from '../components/Item'

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            list: []
        }
    }

    updateInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    deleteItem = (id) => {
        const list = [...this.state.list];
        const updateList = list.filter(item => item.id !== id);
        this.setState({ list: updateList });
    }

    addItem = (e) => {
        if (e.key === 'Enter') {
            const newItem = {
                id: this.state.list.length,
                value: this.state.newItem.slice(),
                isComplete: true,
            };

            const list = [...this.state.list];
            list.push(newItem);
            this.setState({
                list: list, newItem: ''
            })
        }
      }



 

    render() {
        return (
            <>
                <Header text="todos" />
                <section className='todo-app__main'>
                    <input
                        className='todo-app__input'
                        type='text'
                        placeholder='Whate needs to be done?'
                        value={this.state.newItem}
                        onChange={e => this.updateInput('newItem', e.target.value)}
                        onKeyDown={this.addItem}
                    ></input>
                    
                    <ul className='todo-app__list' id='todo-list'>
                        {this.state.list.map(item => {

                            return (
                                <li className='todo-app__item' key={item.id}>
                                    <div className='todo-app__checkbox'>
                                        <input id={item.id} type='checkbox'></input>
                                        <label for={item.id}></label>
                                    </div>
                                    
                                    <h1 className='todo-app__item-detail'>{item.value}</h1>
                                    <img className='todo-app__item-x'
                                        src='./img/x.png'
                                        alt='x'
                                        onClick={()=>this.deleteItem(item.id)}></img>
                                </li>);
                        })}
                    </ul>
                </section>
                <footer className='todo-app__footer'>
                    <div className='todo-app__total'>{this.state.list.length} left</div>
                    <ul className='todo-app__view-button'>
                        <button>All</button>
                        <button>Active</button>
                        <button>Complete</button>
                    </ul>
                    <div className='todo-app__clean'>
                        <button>Clear complete</button>
                    </div>
                </footer>
            </>
        );
    }
}






export default TodoApp;
