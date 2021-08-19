import React, { Component, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import crudService from "../services/crud.service";

import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";

function DisplayEmployees(props) {
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        crudService.getRecords("employees").then(
            (employees) => {
                setLoading(false);
                setRowsData(employees.data.data);
            },
            error => {
    
            });
      }, []);
    
    return(
        <div>
            <h1>Employees List</h1>
            <button><Link to={"/create/employee"} className="btn btn-primary btn-block">
                  Create
                </Link>
            </button>
             <GridTable
        columns={getColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, rowsData, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(rowsData.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(rowsData.id)
        }
      />
        </div>
    )

}

export default DisplayEmployees;
