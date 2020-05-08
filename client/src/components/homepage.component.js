import React, { Component } from "react";
import API from '../services/api';
import config from '../config/config';
import Workspaces from "./workspaces";
// import { subdomain } from "../../../server/models";
const _ = require('lodash');
export default class HomePage extends Component {

    constructor(){
        super()
        this.state = {
            subDomain: '',
            loginErr: '',
            availableDomain: [],

            workspaceName: '',
            editWorkspaceName: '',
            invalidWorkspaceName: '',
            updateWorkspaceName: '',
            isEdit: false,
            workspaces: []
        }
    }

    componentDidMount = () =>{
        const userId = localStorage.getItem("id");
      
       
        const formData = {
            id: userId
        }
        API.post(`${config.API_URL}/getWorkspaces`, formData)
        .then((response) => {
            let { workspaces } = this.state;

            workspaces.push(...response.data);
    
            this.setState({workspaces});

        })
        .catch(function (error) {
            console.log(error);
      
        });

    }


    componentWillMount = () => {
        
        this.delayedCallback = _.debounce(function (event, id) {
            const formData = {
                subDomain: event.target.value
            }
            API.post(`${config.API_URL}/availableDomain`, formData)
            .then((response) => {
             
                
                let { workspaces } = this.state;

                workspaces.map(val => {
                    if (val.id === id) {
                        val.message = response.data.message;
                    }
        
                    return val;
                });
        
                this.setState({workspaces});
                
                // if(!response.data.success){
                //     return this.setState({
                //         domainStatus: response.message
                //     })
    
                // }
                // this.setState(() => ({loginErr: ''}));
                // this.setState({domainStatus: response.data.message})
    
            //     localStorage.setItem("login", "true");
    
            //    return this.props.history.push('/homepage');
            })
            .catch(function (error) {
            console.log(error);
          
            });
        }, 1000);
     }

 


    deleteWorkspace = (event, id)=>{
        event.preventDefault();
        const formData = {
            id
        }
        API.post(`${config.API_URL}/deleteWorkspace`, formData)
        .then((response) => {
            if (response.data.success === true){
                let { workspaces } = this.state;

                workspaces = workspaces.filter(val => val.id !== id);
        
                this.setState({workspaces});
            }
        })
        .catch(function (error) {
            console.log(error);
      
        });
    }

    editWorkspaceName = (event, workspace) =>{
        event.preventDefault();
        
        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.name = event.target.value;
            }

            return val;
        });

        this.setState({workspaces});
    }

    isEdit = (event, workspace) => {
        event.preventDefault();

        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.editMode = !workspace.editMode;
            }

            return val;
        });

        this.setState({workspaces});
    }

    editWorkspace = (event, workspace)=>{
        event.preventDefault();
        
        const { id, name } = workspace;

        const formData = {
            id,
            name
        }
        
        API.post(`${config.API_URL}/editWorkspace`, formData)
        .then((response) => {
            if (response.data.success === true){
                let { workspaces } = this.state;

                workspaces.map(val => {
                    if (val.id === workspace.id) {
                        val.editMode = false;
                    }
        
                    return val;
                });
        
                this.setState({workspaces});
            }
        })
        .catch(function (error) {
            console.log(error);
      
        });
    }



    createWorkspace = (event)=>{
        event.preventDefault();

    

        if(this.state.workspaceName === "") {
            this.setState((val)=> ({
                invalidWorkspaceName: "can not be empty"
            }));

            return
        }
        this.setState({invalidWorkspaceName: ''});

        const userId = localStorage.getItem("id");

        const formData = {
            workspaceName: this.state.workspaceName,
            userId
        }
        API.post(`${config.API_URL}/createWorkspace`, formData)
            .then((response) => {
                let { workspaces } = this.state;

                workspaces.push(response.data.data);

                this.setState({workspaces});

                // this.setState(() => ({loginErr: ''}));
                // this.setState({domainStatus: response.data.message})
    
           
            })
            .catch(function (error) {
            console.log(error);
          
            });
    }




    wrokspaceName = (e) =>{
        this.setState({workspaceName: e.target.value})
    }


    onChange = (event, id) =>{
        event.persist();
    this.delayedCallback(event, id);
        this.setState({subDomain: event.target.value})
    }


    sendSubDomain = (event, id) => {

        event.preventDefault();
            const { subDomain } = this.state;

            if (!subDomain) {
                let { workspaces } = this.state;

                workspaces.map(val => {
                    if (val.id === id) {
                        val.message = 'can not be empty';
                    }
        
                    return val;
                });
        
                this.setState(() => ({workspaces}));
                return;
            }
    
            // const id = localStorage.getItem('id');
     
            const formData = {
                subDomain: subDomain,
                id: id
            }
            API.post(`${config.API_URL}/createSubDomain`, formData)
            .then((response) => {

                let { workspaces } = this.state;

                workspaces.map(val => {
                    if (val.id === id) {
                        val.message = response.data.message;
                    }
        
                    return val;
                });
        
                this.setState({workspaces});
                // this.setState(() => ({loginErr: ''}));
    
            //     localStorage.setItem("login", "true");
    
            //    return this.props.history.push('/homepage');
            })
            .catch(function (error) {
            console.log(error);
          
            });
    }


    render() {
        const { workspaces } = this.state;

        const isLogin = localStorage.getItem("login");

        return (
            <div>
    {isLogin ? 
        <form onSubmit={this.onSubmit}> 
        {this.state.invalidWorkspaceName && <p>{this.state.invalidWorkspaceName}</p>}

        {!!workspaces.length && <Workspaces
            data={workspaces} 
            actions={{
                editWorkspaceName: this.editWorkspaceName,
                editWorkspace: this.editWorkspace,
                isEdit: this.isEdit,
                deleteWorkspace: this.deleteWorkspace,
                onChange: this.onChange,
                sendSubDomain: this.sendSubDomain,
            }}
        />}


        <div style={{margin: '20px 0'}}>
            <input type="text" placeholder="type workspace name" onChange={this.wrokspaceName} />
            <button onClick={this.createWorkspace}>Create workspace</button>
        </div>

                     {/* <h3>Workspace</h3>
             <div className="form-group">
                    <label>Type your subDomain</label>
                    <input type="text"  name="subDomain" onChange={this.onChange} className="form-control" placeholder="Enter subDomain" />

                    <p style={{marginTop: '10px'}}>{this.state.domainStatus}</p>
                    <p style={{color: 'green'}}>{this.state.availableDomain}</p>
                    <button type="submit" style={{marginTop: '40px'}} className="btn btn-primary btn-block">Submit</button>

               </div>  */}






        
            </form>:<h3>Please Login</h3>
         }

             </div>
            
                    

        );
    }
}
