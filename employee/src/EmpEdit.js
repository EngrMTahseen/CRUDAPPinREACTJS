import { useEffect, useState } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import './App.css';

const EmpEdit = () => {
    const { empId } = useParams();
    //const [empData, empDataChange] = useState({});
  
    useEffect(() => {
      fetch("http://localhost:3001/employee/" + empId)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
            idChange(resp.id);
            nameChange(resp.name);
            emailChange(resp.email);
            phoneChange(resp.phone);
            activeChange(resp.active);
            
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [active, activeChange] = useState(true);
    const [validation, validationChange] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log({id,name,email,phone,active});
  
      const empData = { id, name, email, phone, active };
  
      fetch("http://localhost:3001/employee/"+empId, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empData),
      })
        .then((res) => {
          // console.log({id,name,email,phone,active});
          alert("Employee Data is Updated Successfully !");
          navigate("/");
        })
        .catch((err) => {
          alert("Error is Updated Employee Data !!!");
        });
    };
  


  return (<div>
    <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h1 className="ml">Edit the Employee</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={id}
                        disabled="disabled"
                      />
                      <span className="text-danger">You Cannot Change ID!</span>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={(e) => nameChange(e.target.value)}
                        onMouseDown={(e) => validationChange(true)}
                        required
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-danger">
                          Enter the Name Please ...
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        value={phone}
                        onChange={(e) => phoneChange(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12 checkbox">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={active}
                        onChange={(e) => activeChange(e.target.checked)}
                      ></input>
                      <label className="form-check-label"> &nbsp;Is Active</label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-success">
                        Update Record
                      </button>
                      <Link to="/" className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>);
};
export default EmpEdit;
