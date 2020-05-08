import React, { Fragment } from 'react';

function Workspaces({ data, actions }) {
    return <div className="workspaces">
        {data.map(workspace => <div key={workspace.id} style={{border: '1px solid #999', padding: '15px 10px'}}>
            {workspace.editMode ? <Fragment>
                <input type="text" 
                    name="text"
                    value={workspace.name}
                    onChange={(event) => {
                        actions.editWorkspaceName(event, workspace);
                    }}
                    className="form-control"
                    placeholder="Enter workspace name"
                    style={{marginTop: '10px'}} 
                />
                <button className="btn btn-primary btn-block" onClick={(event) => {
                    actions.editWorkspace(event, workspace);
                }}>Save</button>
            </Fragment> : <Fragment>
            <h4 style={{textAlign: 'center'}}>{workspace.name}</h4>
            <button className="btn btn-primary btn-block" onClick={(event) => {
                actions.isEdit(event, workspace);
            }}>
                Edit
            </button>
            </Fragment>}

        <button className="btn btn-primary btn-block" onClick={(event) => {
            actions.deleteWorkspace(event, workspace.id);
        }}>
            Delete
        </button>

        
        <div className="form-group" style={{marginTop: '20px', textAlign: 'center'}}>
                <label>SubDomain</label>
                <input type="text" name="text" className="form-control" onChange={(event) => {
                    actions.onChange(event, workspace.id);
                }} placeholder="Enter subdomain" />
            </div>

           <p>{workspace.message}</p>
           
        <button className="btn btn-primary btn-block" onClick={(event) => {
            actions.sendSubDomain(event, workspace.id);
        }}>
            Send
        </button>

        </div>)}
    </div>;
}

export default Workspaces;