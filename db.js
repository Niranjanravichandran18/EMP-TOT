const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Niranjan@182",
  database: "jobsearch",
  port: "3306",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/emp_login", (req, res) => {
  const login_user = req.body.username;
  const login_password = req.body.password;
  pool.query(
    `select username,password,permission from login_details where username = '${login_user}'`,
    (err, result, fields) => {
      if (err) {
        console.log("login unsuccessful");
      }
      const [user_details] = result;
      // console.log(result)
      if (
        login_user == user_details["username"] &&
        login_password ==user_details["password"]
      ) {
        let userPermission = result[0].permission;
        if (userPermission === "admin") {
          let user = { user: userPermission };
          res.send(user);
        } else if (userPermission === "candidate") {
          let user = { user: userPermission };
          res.send(user);
        }
        console.log("login successful");
      } else {
        console.log("login unsuccessful");
      }
    }
  );
});

app.post("/emp_dashboard", (req, res) => {
  const skills = req.body.searchValue;
  let query;
  if (skills == "") {
    query = "SELECT signup_details.candidate_id,signup_details.id, signup_details.firstname, signup_details.lastname, signup_details.skills, signup_details.graduation, signup_details.email_id, signup_details.mobile_number, graphs.candidate_status FROM `signup_details` INNER JOIN `graphs` ON signup_details.candidate_id=graphs.candidate_id";
  } else {
    query ="SELECT signup_details.candidate_id,signup_details.id, signup_details.firstname, signup_details.lastname, signup_details.skills, signup_details.graduation, signup_details.email_id, signup_details.mobile_number, graphs.candidate_status FROM `signup_details` INNER JOIN `graphs` ON signup_details.candidate_id=graphs.candidate_id WHERE"+` skills='${skills}'`;
  }

  pool.query(query, (err, result) => {
    if (err) { throw err; }
    res.send(result);
  });
});

app.post("/candidate_update", (req, res) => {
 // const email_id = req.body.email_id;
  const username = req.body.username;
  const pincode = req.body.pincode;
  const post_graduation=req.body.post_graduation;
  const designation=req.body.designation;
  const city=req.body.city;
  const resume=req.body.resume;
  let count=0;
  // update data in the in pincode column
  if (pincode !== "") {
    const sql = `UPDATE signup_details SET pincode = "${pincode}" WHERE email_id = "${username}"`;
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results.affectedRows + " row(s) updated");
    });
    ++count;
  }
 

  // update data in the in email column
  // if ( email_id!== "") {
  //   const sql = `UPDATE signup_details SET email_id = "${email_id}" WHERE email_id = "${username}"`;
  //   pool.query(sql, function (error, results, fields) {
  //     if (error) throw error;
  //     console.log(results.affectedRows + " row(s) updated");
  //   });
  // }

   // update data in the in designation column
  if (designation !== "") {
    const sql = `UPDATE signup_details SET designation = "${designation}" WHERE email_id = "${username}"`;
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results.affectedRows + " row(s) updated");
    });
    ++count;
  }

   // update data in the in post_graduation column
  if (post_graduation !== "") {
    const sql = `UPDATE signup_details SET post_graduation = "${post_graduation}" WHERE email_id = "${username}"`;
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results.affectedRows + " row(s) updated");
    });
    ++count;
  }

 // update data in the in city column
  if (city !== "") {
    const sql = `UPDATE signup_details SET city = "${city}" WHERE email_id = "${username}"`;
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results.affectedRows + " row(s) updated");
    });
    ++count;
  }
  if(count>0){
    res.send(true)
  }
   // update data in the in resume column
  // if (resume !== "") {
  //   const sql = `UPDATE signup_details SET resume = "${resume}" WHERE firstname = "${username}"`;
  //   pool.query(sql, function (error, results, fields) {
  //     if (error) throw error;
  //     console.log(results.affectedRows + " row(s) updated");
  //   });
  // }
});

app.get(`/emp_graphs`, (req, res) => {
    let rejectedData = [];
    let placedData = [];
    let progressData = [];
    let candidateid;
    pool.query(
      `SELECT candidate_id,candidate_status FROM graphs`,
      (error, response, results) => {
        if (error) throw error;
        response.forEach((result) => {
          if (result.candidate_status === "rejected") {
            rejectedData.push(result);
          } else if (result.candidate_status === "placed") {
            placedData.push(result);
          } else if (result.candidate_status === "inprogress") {
            progressData.push(result);
          }
          candidateid = result.candidate_id;
        });
        let emp_status = {
          //rejected: rejectedData.length,
          placed: placedData.length,
          progress: progressData.length,
        };
        let response_status = JSON.stringify(emp_status);
        res.send(response_status);
      }
    );
  });

  app.get(`/total_candidates`, async (req, res) => {
    pool.query(
      "SELECT COUNT(*) AS total FROM graphs",
      function (error, results, fields) {
        if (error) throw error;
        let totalCandidates = results;
        res.send(totalCandidates);
      }
    );
  });

  app.post("/emp_signup", (req, res) => {
    // const city1 = req.body.city;
    // const country1 = req.body.country;
    const date1 = req.body.date;
    // const designation1 = req.body.designation;
    const email_id1 = req.body.email_id;
    // const fathername1 = req.body.father_name;
    const firstname1 = req.body.firstname;
    const lastname1 = req.body.lastname;
    const mobile_number1 = req.body.mobile_number;
    // const pincode1 = req.body.pincode;
    // const state1 = req.body.state;
    // const gender1 = req.body.gender;
    // const sslc1 = req.body.sslc;
    // const puc1 = req.body.puc;
    // const graduation1 = req.body.graduation;
    // const post_graduation1 = req.body.post_graduation;
    // const experience1 = req.body.experience;
    // const adhar_number1 = req.body.adhar_number;
    // const pan_number1 = req.body.pan_number;
    const candidate_id = firstname1 + mobile_number1;
    const password1 = req.body.password;
  
    pool.query(
      `INSERT INTO signup_details(firstname, lastname,candidate_id, email_id, mobile_number,dob) VALUES (?,?,?,?,?,?);`,
      [
        firstname1,
        lastname1,
        candidate_id,
        email_id1,
        // designation1,
        mobile_number1,
        date1,
        // sslc1,
        // puc1,
        // graduation1,
        // post_graduation1,
        // fathername1,
        // experience1,
        // gender1,
        // country1,
        // state1,
        // city1,
        // pincode1,
        // adhar_number1,
        // pan_number1,
      ],
      (err, result, fields) => {
        if (err) {
          return console.log(err);
        } else {
          pool.query(
            `INSERT INTO graphs(candidate_id, email_id) VALUES (?,?);`,
            [candidate_id,
            email_id1],
            (err, result, fields) => {
              if (err) {
                return console.log(err);
              } else {
                console.log("Data inserted successfully into graphs");
              }
            }
          );
          res.send(true);
          console.log("Data inserted successfully into signup details");
        }
      }
    );
  
    const permission="candidate"
    pool.query(`INSERT INTO login_details(username,password,permission) VALUES (?,?,?);`,[email_id1,password1,permission],(err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      console.log("Login details inserted successfully");
    })
  });
  
  app.post("/candidate_details", (req, res) => {
    let request_id = req.body.id;
    pool.query(
      `SELECT * FROM signup_details WHERE id = ${request_id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  
  app.post("/admin_empupdate", (req, res) => {
    //const email_id1 = req.body.email_id;
    const username1 = req.body.username;
    const pincode1 = req.body.pincode;
    const post_graduation1 = req.body.post_graduation;
    const designation1 = req.body.designation;
    const city1 = req.body.city;
    const resume1 = req.body.resume;
    const comments1 = req.body.comments;
    const candidate_status1 = req.body.candidate_status;
    let count =0;
    // update data in the in pincode column
    if (pincode1 !== "" && pincode1 !== undefined) {
      const sql = `UPDATE signup_details SET pincode = "${pincode1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });
      ++count;
    }
  
    // update data in the in email id column
    // if (email_id1 !== "" && email_id1 !== undefined) {
    //   const sql = `UPDATE signup_details SET email_id = "${email_id1}" WHERE email_id = "${username1}"`;
    //   pool.query(sql, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results.affectedRows + " row(s) updated");
    //   });
    // }
  
    // update data in the designation
    if (designation1 !== "" && designation1 !== undefined) {
      const sql = `UPDATE signup_details SET designation = "${designation1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });
      ++count
    }
  
    // update data in the graduation
    if (post_graduation1 !== "" && post_graduation1 !== undefined) {
      const sql = `UPDATE signup_details SET post_graduation = "${post_graduation1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });

      ++count;
    }
  
    // update data in the city
    if (city1 !== "" && city1 !== undefined) {
      const sql = `UPDATE signup_details SET city = "${city1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });
      ++count
    }
  
    // update data in resume
    // if (resume !== "") {
    //   const sql = `UPDATE signup_details SET resume = "${resume}" WHERE firstname = "${username}"`;
    //   pool.query(sql, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results.affectedRows + " row(s) updated");
    //   });
    // }
  
    // update data in comments
    if (comments1 !== "" && comments1 !== undefined) {
      const sql = `UPDATE graphs SET comments = "${comments1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });
      ++count
    }
  
    // update data in status
    if (candidate_status1 !== "" && candidate_status1 !== undefined) {
      const sql = `UPDATE graphs SET candidate_status = "${candidate_status1}" WHERE email_id = "${username1}"`;
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results.affectedRows + " row(s) updated");
      });
      ++count
    }

    if(count>0){
      res.send(true)
    }
  });


  app.listen(3001, () => {
    console.log("running in port 3001");
  });
  
