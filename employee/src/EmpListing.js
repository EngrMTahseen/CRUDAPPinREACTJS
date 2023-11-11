import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empData, empDataChange] = useState("");

  const navigate = useNavigate();

  const loadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const loadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const loadDelete = (id) => {
    if (window.confirm("Do you want to delete this employee record?")) {
      fetch("http://localhost:3001/employee/" + id, {
        method: "DELETE",
      }).then((res) => {
        alert("Employee Data is Deleted Successfully !");
        // window.location.reload();
      });
    }
  };

  

  useEffect(() => {
    fetch("http://localhost:3001/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empDataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card mt-2">
        <div className="card-title">
          <h1 className="ml">Employee Listing</h1>
        </div>

        <div className="card-body">
          <div id="btnlist">
            <Link to="/employee/create" className="btn btn-success">
              Add New
            </Link>
          </div>
          <table className="table">
            <thead className="bg-dark text-white">
              <tr>
                <th> ID</th>
                <th> Name</th>
                <th> Email</th>
                <th> Phone</th>
                <th> Status</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {empData &&
                empData.map((item) => (
                  <tr key={item.id}>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.email}</td>
                    <td> {item.phone}</td>
                    <td>
                      {" "}
                      {item.active == true && (
                        <span className="text-success">Active</span>
                      )}{" "}
                      {item.active == false && (
                        <span className="text-danger">Inactive</span>
                      )}
                    </td>
                    <td>
                      <a
                        href=""
                        className="btn btn-warning"
                        onClick={() => {
                          loadEdit(item.id);
                        }}
                      >
                        Edit
                      </a>
                      <a
                        href=""
                        className="btn btn-success"
                        onClick={() => {
                          loadDetail(item.id);
                        }}
                      >
                        Detail
                      </a>
                      <a
                        href=""
                        className="btn btn-danger"
                        onClick={() => {
                          loadDelete(item.id);
                        }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {empData.length == 0 && (
            <div className="text-center">
              <h4>No Record Added Yet !</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmpListing;
