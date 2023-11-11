import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";

const EmpDetail = () => {
  const { empId } = useParams();
  const [empData, empDataChange] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/employee/" + empId)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empDataChange(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {empData && (
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <div className="card">
              <hr />
              <div className="card-title">
                <h3 className="ml">Single Employee Information</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th> ID</th>
                      <th> Name</th>
                      <th> Email</th>
                      <th> Phone</th>
                      <th> Status</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {empData.id}</td>
                      <td> {empData.name}</td>
                      <td> {empData.email}</td>
                      <td> {empData.phone}</td>
                      <td>
                        {" "}
                        {empData.active == true && (
                          <span className="text-success">Active</span>
                        )}{" "}
                        {empData.active == false && (
                          <span className="text-danger">Inctive</span>
                        )}
                      </td>
                      <td>
                        {" "}
                        <Link to="/" className="btn btn-warning">
                          Back
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmpDetail;
