import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import crudService from "../services/crud.service";
import AuthService from "../services/auth.service";

import GridTable from "@nadavshaar/react-grid-table";
import getFeedbackColumns from "./getFeedbackColumns.js";

function DisplayFeedback(props) {
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const user = AuthService.getCurrentUser();
    useEffect(() => {
        setLoading(true);
        crudService.getRecords("feedback/"+user.username).then(
            (feedback) => {
                setLoading(false);
                setRowsData(feedback.data.data);
            },
            error => {
    
            });
      }, []);
    
    return(
        <div>
            <h1>Performance review feedback summary</h1>
            {AuthService.isAdmin() && <button><Link to={"/create/feedback"} className="btn btn-primary btn-block">
                  Assign
                </Link>
            </button>}
             <GridTable
        columns={getFeedbackColumns({ setRowsData })}
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

export default DisplayFeedback;
