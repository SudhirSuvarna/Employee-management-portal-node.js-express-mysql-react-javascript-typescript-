import React, { Component, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import crudService from "../services/crud.service";

import GridTable from "@nadavshaar/react-grid-table";
import getReviewColumns from "./getReviewColumns.js";

function DisplayReviews(props) {
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        crudService.getRecords("reviews").then(
            (reviews) => {
                setLoading(false);
                setRowsData(reviews.data.data);
            },
            error => {
    
            });
      }, []);
    
    return(
        <div>
            <h1>Performance Reviews List</h1>
            <button><Link to={"/create/review"} className="nav-link btn btn-primary btn-block">
                  Create
                </Link>
            </button>
             <GridTable
        columns={getReviewColumns({ setRowsData })}
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

export default DisplayReviews;
