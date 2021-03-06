import './App.css';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/Jobs/getjobs").then((result) => {
      result.json().then((res) => {
        //console.warn("Result",res)
        setData(res)
      })
    })
  }, [])
  const [jobname, setJname] = useState("");
  const [machine_id, setMid] = useState("")
  const [schedule_date, setSDate] = useState(new Date());
  const [latest_schedule_date, setReSDate] = useState(new Date());
  const [shift, setShift] = useState("")
  const [status, setStatus] = useState("")
  const [job_count, setJcount] = useState("")
  // Date formater
  function formater(dateVal) {
    let date = "" +dateVal.getFullYear()+ "-";

    if (dateVal.getMonth() < 10) {
      date += "0"
    } 
    
    date += dateVal.getMonth() + 1 + "-" + dateVal.getDate();

    return date;
  }
// get Data from form
  function getFormData(e) {
    console.warn({ jobname, machine_id, shift, job_count, status, schedule_date, latest_schedule_date });
    // console.log("Date",schedule_date.toLocaleDateString())
    // onsole.log("first", typeof (shift))
    // var schedule_date=schedule_date.toLocaleDateString();
    let data = { jobname, machine_id, shift, job_count, status, schedule_date, latest_schedule_date }
    fetch("http://localhost:3000/Jobs/getjobsbyjobcount", {
      method: "POST",
      headers: {
                "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    }).then((result) => {
      console.warn("result", result);
      alert("Data Insert Sucessfully!!!!")
    })
    e.preventDefault()
  }

  // console.warn(data)
  return (

    <div className="App">
      <h1>Job Master Table</h1>
      <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add Job</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">JobID</th>
            <th scope="col">JobName</th>
            <th scope="col">MachineName</th>
            <th scope="col">Status</th>
            <th scope="col">Schedule_date</th>
            <th scope="col">JobCount</th>
            <th scope="col">Latest_schedule_date</th>
            <th scope="col">Shift</th>
            <th scope="col">Reschedule_reason</th>

          </tr>
        </thead>
        {
          data.map((item) =>
            <tbody>
              <tr>
                <td scope="row">{item.jobid}</td>
                <td scope="row">{item.jobname}</td>
                <td scope="row">{item.machine_name}</td>
                <td scope="row">{item.status}</td>
                <td scope="row">{formater(new Date(item.schedule_date))}</td>
                <td scope="row">{item.job_count}</td>
                <td scope="row">{formater(new Date(item.latest_schedule_date))}</td>
                <td scope="row">{item.shift}</td>
                <td scope="row">{item.reschedule_reason}</td>

              </tr>
            </tbody>
          )

        }
      </table>
      {/* <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add Job</button> */}
      {/* <!-- Button trigger modal --> */}
      {/* <!-- Modal --> */}
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Insert New Job</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={getFormData}>
                <div class="mb-3">
                  <label class="form-label">JobName</label>
                  <input type="text" class="form-control" onChange={(e) => setJname(e.target.value)} placeholder="Job Name" />

                </div>
                <div>
                  <label class="form-label">Machine</label>

                  <select class="form-select" onChange={(e) => setMid(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select the Machine</option>
                    <option value="1">3DPrinter</option>
                    <option value="2">Auto-Stitcher</option>
                    <option value="3">Auto-Corrugator</option>
                    <option value="4">Rotary Auto-Feed</option>
                    <option value="5">2DPrinter</option>

                  </select>
                </div>
                {/*Schedule Date */}
                <div class="container ">
                  <div class="row">
                    <div class="col-6 p-4">
                      <label class="form-label">Schedule Date </label>
                    </div>
                    <div class="col-6 p-3">
                      <DatePicker selected={schedule_date} onChange={(date) => setSDate(date)} />
                    </div>

                  </div>
                </div>
                {/*Rechedule Date */}
                <div class="container ">
                  <div class="row">
                    <div class="col-6 p-4">
                      <label class="form-label">Reschedule Date </label>
                    </div>
                    <div class="col-6 p-3">
                      <DatePicker selected={latest_schedule_date} onChange={(date) => setReSDate(date)} />
                    </div>

                  </div>
                </div>
                {/* status */}
                <div>
                  <label class="form-label">Status</label>

                  <select class="form-select" onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select the Status</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </div>
                {/* shift */}
                <div>
                  <label class="form-label">Shift</label>

                  <select class="form-select" onChange={(e) => setShift(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select the Shift</option>
                    <option value="1">Morning</option>
                    <option value="2">Night</option>
                  </select>
                </div>
                {/* <div>
                  <label class="form-label">Select Shift</label>
                  <input type="radio" class="form-check-input" name="optradio" onChange={(e) => setShift(e.target.value)} value="1" checked />Morning
                  <label class="form-check-label" for="radio1"></label>
                  <input type="radio" class="form-check-input" name="optradio" onChange={(e) => setShift(e.target.value)} value="2" />Night
                  <label class="form-check-label" for="radio2"></label>

                </div> */}

                {/* JobCount */}
                <div class="mb-3">
                  <label class="form-label">JobCount</label>
                  <input type="text" class="form-control" onChange={(e) => setJcount(e.target.value)} placeholder="Enter JobCount" />
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" >Add Details</button>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;


