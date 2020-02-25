import React, { Component } from 'react';

const initState = {
    username: "",
    email: "",
    password: "",
}

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initState,

        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        let user={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        let config = {
            method : 'POST',
            headers : {
                'Content-type' : 'Application/json'
            },
            body: JSON.stringify(user), 
        };

        fetch('http://reactcourseapi.herokuapp.com/user/register', config)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                this.setState({...initState})
                
                

            })
            .catch(err => {
                console.log(err);
                
            })
    }

    changeHandler = (event) =>{
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    render() {
        return (
            <>
            <h1>REGISTRO</h1>
            <form onSubmit={this.submitHandler}>
                <label>Username:
                <input
                        type="text"
                        id="username" 
                        onChange = {this.changeHandler}
                        alue={this.state.username}></input>
                </label>
                <label>Email:
                <input
                        type="email"
                        id="email" 
                        onChange = {this.changeHandler}
                        alue={this.state.email}></input>
                </label>
                <label>Password:
                <input
                        type="password"
                        id="password" 
                        onChange = {this.changeHandler}
                        alue={this.state.password}></input>
                </label>
                <button type="submit">Sign up</button>

            </form>
            </>
        )
    }
}