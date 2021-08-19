import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import crudService from "../services/crud.service";
import "../styles/form.css";

export default function CreateEmployeeFeedback(props) {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedAssignee, setSelectedAssignee] = useState({});

  useEffect(() => {
    crudService.getRecords("employees").then(
        (employees) => {
            setEmployees(employees.data.data);
        },
        error => {

        });

    crudService.getRecords("users").then(
        (users) => {
            setUsers(users.data.data);
        },
        error => {

        });
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let data = {
        'employee_id' : ""+selectedEmployee.id,
        'employee_name' : selectedEmployee['first_name']+' '+selectedEmployee['last_name'],
        'assignee_name' : selectedAssignee.username,
        'feedback' : ''
    };
    crudService.create("feedback",data).then(
        () => {
           alert("Feedback request created successfully!!!.");
           props.history.push("/feedback");
           window.location.reload();
        },
        error => {

        });
  }

  const handleChange = (type, value) => {
      if(type === 'employee') {
        setSelectedEmployee(value);
      } else {
        setSelectedAssignee(value);
      }
  };

  return (
      <form onSubmit={formSubmitHandler}>
            <h1>Assign employees to give feedback</h1>
            <div class="form-field">
                <label>Employee name</label>
                <Autocomplete
                    id="combo-box-demo"
                    options={employees}
                    onChange={(e, value) => {handleChange("employee", value)}}
                    getOptionLabel={(option) => option['first_name'] + " " + option['last_name']}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Combo box" variant="outlined" />
                    )}
                />
            </div>
            <div class="form-field">
                <label>Assignee name</label>
                <Autocomplete
                    id="combo-box-demo"
                    options={users}
                    onChange={(e, value) => {handleChange("assignee", value)}}
                    getOptionLabel={(option) => option['username'] + " " + option['email']}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Combo box" variant="outlined" />
                    )}
                />
            </div>
            <input className="btn-primary"
                type='submit'
            />
      </form>
  );
}