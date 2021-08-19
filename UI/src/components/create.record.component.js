import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import crudService from "../services/crud.service";
import "../styles/form.css";

export class createRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      metadata : { "attributes" : []},
      data : {},
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    crudService.create(this.state.metadata.type,this.state.data).then(
        () => {
           alert("Record created");
           if(this.state.metadata.type === 'reviews') {
            this.props.history.push("/performance_reviews");
           } else {
            this.props.history.push("/employees");
           }
           window.location.reload();
        },
        error => {

        });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let data = this.state.data;
    data[nam] = val;
    this.setState({data});
  };

  async getMetaData(){
    let pathName = this.props.location.pathname.split('/');
    const metadata = await require('../locales/'+pathName[pathName.length-1]+'.json');
    this.setState({metadata : metadata});
 }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    this.getMetaData();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
          <form onSubmit={this.mySubmitHandler}>
            <h1>{this.state.metadata && this.state.metadata.title}</h1>
            {
                this.state.metadata && this.state.metadata.attributes.map((field) => {
                    return <div className="form-field">
                              <label> {field.displayName} </label>
                              <input type="text" name={field.name} onChange={this.myChangeHandler} />
                            </div>
                })
            }
            <input className="btn-primary"
            type='submit'
            />
         </form>
      </div>: null}
      </div>
    );
  }
}

