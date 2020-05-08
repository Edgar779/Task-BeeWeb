import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
import HomePage from './homepage.component';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          loginErr: ''
        };
      }

      componentDidMount(){
        const isLogin = localStorage.getItem("login");
        if(isLogin) this.props.history.push('/homepage'); 
      }

    handleEmailChange = (event) =>{
        const email = event.target.value;

        this.setState({
        email: email
        });

  }
    handlePasswordChange = (event) =>{
        const password = event.target.value;

        this.setState({
        password: password
        });
    }
    handleSubmit = (event) => {
          

        event.preventDefault();
    
        const { email, password } = this.state;
        const formData = {
            email, email,
            password: password
        }
        API.post(`${config.API_URL}/sign-in`,formData)
        .then((response) => {
            if(!response.data.success){

                return this.setState({
                    loginErr: response.data.message
                })

            }

            this.setState(() => ({loginErr: ''}));

            // decided not to go deep with the token

            localStorage.setItem("login", 'true');
            localStorage.setItem("id", response.data.id);

            //

           return this.props.history.push('/homepage');
        })
        .catch(function (error) {
        console.log(error);
      
        });
        
      };
    render() {
        return (
            <form onSubmit={this.handleSubmit}> 
             {!this.state.loginErr ?   <h3>Sign In</h3> : <h3 style={{color: 'red'}}>{this.state.loginErr}</h3>}

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"  name="email" onChange={this.handleEmailChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
