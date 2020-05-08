import React, { Component } from "react";
import axios from 'axios';
import HomePage from './homepage.component';
import Login from './login.component';
import { Redirect } from 'react-router-dom'
import API from '../services/api';
import config from '../config/config';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
          fullName: "",
          email: "",
          password: "",
          loginErr: ''
        };
      }
      
      componentDidMount(){
        const isLogin = localStorage.getItem("login");
        if(isLogin) this.props.history.push('/homepage'); 
      }

      handleFullNameChange = (event) => {
        const fullName = event.target.value;
        this.setState({
          fullName: fullName
        });
      };
      handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({
          email: email
        });
      };
      handlePasswordChange = (event) => {
        const password = event.target.value;
        this.setState({
          password: password
        });
      };
    
      handleSubmit = (event) => {
          

        event.preventDefault();
    
        const { fullName, email, password } = this.state;
            const formData = {
                fullName: fullName,
                email, email,
                password: password,
            }
        API.post(`${config.API_URL}/sign-up`,formData)
        .then((response) => {
            if(!response.data.success){

                return this.setState({
                    loginErr: response.data.message
                })

            }

            this.setState(() => ({loginErr: ''}));


            return this.props.history.push('/sign-in');

        })
        .catch(function (error) {
        console.log(error);
      
        });
        
      };

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
             {!this.state.loginErr ?   <h3>Sign Up</h3> : <h3 style={{color: 'red'}}>{this.state.loginErr}</h3>}
                

                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullName" onChange={this.handleFullNameChange} className="form-control" placeholder="Full Name" />
                </div>

        

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" onChange={this.handleEmailChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}