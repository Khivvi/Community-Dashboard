const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

const Table = require("./models/table");
const Login = require("./models/login");
const Review = require("./models/Review");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
require("dotenv").config();


const dbURI = "mongodb+srv://Khivvi:Raunak@table.mznbby2.mongodb.net/tables?retryWrites=true&w=majority";
mongoose.connect(dbURI);
app.listen(3000);
app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});
app.use(express.urlencoded({ extended: true }));

app.get("/login_page", async (req, res) => {
  res.render("login_page");
});
app.get("/", async (req, res) => {
  const timetables = await Table.find({}, { regnum: 1, timetable: 1, name: 1 });
  var arr = [];
  var i = 0;
  timetables.forEach((item) => {
    arr[i] = getClass(item.timetable);
    i++;
    module.exports = arr;
  });
  //.then((result)=>{
  res.render("index", { timetables, arr });
});
app.get("/index", async (req, res) => {
  const timetables = await Table.find({}, { regnum: 1, timetable: 1, name: 1 });
  var arr = [];
  var i = 0;
  timetables.forEach((item) => {
    arr[i] = getClass(item.timetable);
    i++;
    module.exports = arr;
  });
  //.then((result)=>{
  res.render("index", { timetables, arr });
  //})
  //console.log(timetables);
});

app.get("/input_page", (req, res) => {
  res.render("input_page");
});
app.get("/signup_page", (req, res) => {
  res.render("signup_page");
});

app.get("/index2", (req, res) => {
  Table.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index2", { title: "Tables", tables: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index3", (req, res) => {
  Table.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index3", { title: "Tables", tables: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/review", (req, res) => {
  res.render("review");
});

app.get("/verify", (req, res) => {
  res.render("verify");
});

app.post("/signup_page", (req, res) => {
  const login = new Login(req.body);
  login
    .save()
    .then((result) => {
      res.redirect("/login_page");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/review", (req, res) => {
  const review = new Review(req.body);
  review
    .save()
    .then((result) => {
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/input_page", (req, res) => {
  let table = new Table({
    name: req.body.name,
    regnum: req.body.regnum,
    timetable: getTimetable(req.body.timetable),
  });
  table
    .save()
    .then((result) => {
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/login_page", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Login.findOne({ email: email });
    if (useremail.password === password) {
      const timetables = await Table.find(
        {},
        { regnum: 1, timetable: 1, name: 1 }
      );
      var arr = [];
      var i = 0;
      timetables.forEach((item) => {
        arr[i] = getClass(item.timetable);
        i++;
        module.exports = arr;
      });
      //.then((result)=>{
      res.render("index", { timetables, arr });
    } else {
      res.send("Password is not matching");
    }
  } catch (error) {
    res.status(400).send("Invalid Email");
  }
});
app.post("/verify", async (req, res) => {
  try {
    const regnum = req.body.regnum;
    const slots = await Table.findOne({ regnum: regnum });
    res.render("message", { slots });
  } catch (error) {}
});

app.use((req, res) => {
  res.status(404).render("404");
});

const getTimetable = (text) => {
  const d = new Date("2000-02-07 2:30 PM");
  var result = "";

  A1 = false;
  TA1 = false;
  TAA1 = false;
  A2 = false;
  TA2 = false;
  TAA2 = false;
  B1 = false;
  TB1 = false;
  TBB1 = false;
  B2 = false;
  TB2 = false;
  TBB2 = false;
  C1 = false;
  TC1 = false;
  TCC1 = false;
  C2 = false;
  TC2 = false;
  TCC2 = false;
  D1 = false;
  TD1 = false;
  TDD1 = false;
  D2 = false;
  TD2 = false;
  TDD2 = false;
  E1 = false;
  TE1 = false;
  E2 = false;
  TE2 = false;
  F1 = false;
  TF1 = false;
  F2 = false;
  TF2 = false;
  G1 = false;
  TG1 = false;
  G2 = false;
  TG2 = false;

  L1 = false;
  L3 = false;
  L5 = false;
  L7 = false;
  L9 = false;
  L11 = false;
  L13 = false;
  L15 = false;
  L17 = false;
  L19 = false;
  L21 = false;
  L23 = false;
  L25 = false;
  L27 = false;
  L29 = false;
  L31 = false;
  L33 = false;
  L35 = false;
  L37 = false;
  L39 = false;
  L41 = false;
  L43 = false;
  L45 = false;
  L47 = false;
  L49 = false;
  L51 = false;
  L53 = false;
  L55 = false;
  L57 = false;
  L59 = false;

  var pattern = /A1-/m;
  if (pattern.test(text)) {
    A1 = true;
    result += "A1 ";
  }

  var pattern = /TA1-/m;
  if (pattern.test(text)) {
    TA1 = true;
    result += "TA1 ";
  }

  var pattern = /A2-/m;
  if (pattern.test(text)) {
    A2 = true;
    result += "A2 ";
  }

  var pattern = /TA2-/m;
  if (pattern.test(text)) {
    TA2 = true;
    result += "TA2 ";
  }

  var pattern = /B1-/m;
  if (pattern.test(text)) {
    B1 = true;
    result += "B1 ";
  }

  var pattern = /TB1-/m;
  if (pattern.test(text)) {
    TB1 = true;
    result += "TB1 ";
  }

  var pattern = /B2-/m;
  if (pattern.test(text)) {
    B2 = true;
    result += "B2 ";
  }

  var pattern = /TB2-/m;
  if (pattern.test(text)) {
    TB2 = true;
    result += "TB2 ";
  }

  var pattern = /C1-/m;
  if (pattern.test(text)) {
    C1 = true;
    result += "C1 ";
  }

  var pattern = /TC1-/m;
  if (pattern.test(text)) {
    TC1 = true;
    result += "TC1 ";
  }

  var pattern = /C2-/m;
  if (pattern.test(text)) {
    C2 = true;
    result += "C2 ";
  }

  var pattern = /TC2-/m;
  if (pattern.test(text)) {
    TC2 = true;
    result += "TC2 ";
  }

  var pattern = /D1-/m;
  if (pattern.test(text)) {
    D1 = true;
    result += "D1 ";
  }

  var pattern = /TD1-/m;
  if (pattern.test(text)) {
    TD1 = true;
    result += "TD1 ";
  }

  var pattern = /D2-/m;
  if (pattern.test(text)) {
    D2 = true;
    result += "D2 ";
  }

  var pattern = /TD2-/m;
  if (pattern.test(text)) {
    TD2 = true;
    result += "TD2 ";
  }

  var pattern = /E1-/m;
  if (pattern.test(text)) {
    E1 = true;
    result += "E1 ";
  }

  var pattern = /TE1-/m;
  if (pattern.test(text)) {
    TE1 = true;
    result += "TE1 ";
  }

  var pattern = /E2-/m;
  if (pattern.test(text)) {
    E2 = true;
    result += "E2 ";
  }

  var pattern = /TE2-/m;
  if (pattern.test(text)) {
    TE2 = true;
    result += "TE2 ";
  }

  var pattern = /F1-/m;
  if (pattern.test(text)) {
    F1 = true;
    result += "F1 ";
  }

  var pattern = /TF1-/m;
  if (pattern.test(text)) {
    TF1 = true;
    result += "TF1 ";
  }

  var pattern = /F2-/m;
  if (pattern.test(text)) {
    F2 = true;
    result += "F2 ";
  }

  var pattern = /TF2-/m;
  if (pattern.test(text)) {
    TF2 = true;
    result += "TF2 ";
  }

  var pattern = /G1-/m;
  if (pattern.test(text)) {
    G1 = true;
    result += "G1 ";
  }

  var pattern = /TG1-/m;
  if (pattern.test(text)) {
    TG1 = true;
    result += "TG1 ";
  }

  var pattern = /G2-/m;
  if (pattern.test(text)) {
    G2 = true;
    result += "G2 ";
  }

  var pattern = /TG2-/m;
  if (pattern.test(text)) {
    TG2 = true;
    result += "TG2 ";
  }

  var pattern = /L1-/m;
  if (pattern.test(text)) {
    L1 = true;
    result += "L1 ";
  }

  var pattern = /L3-/m;
  if (pattern.test(text)) {
    L3 = true;
    result += "L3 ";
  }

  var pattern = /L5-/m;
  if (pattern.test(text)) {
    L5 = true;
    result += "L5 ";
  }

  var pattern = /L7-/m;
  if (pattern.test(text)) {
    L7 = true;
    result += "L7 ";
  }

  var pattern = /L9-/m;
  if (pattern.test(text)) {
    L9 = true;
    result += "L9 ";
  }

  var pattern = /L11-/m;
  if (pattern.test(text)) {
    L11 = true;
    result += "L11 ";
  }

  var pattern = /L13-/m;
  if (pattern.test(text)) {
    L13 = true;
    result += "L13 ";
  }

  var pattern = /15-/m;
  if (pattern.test(text)) {
    L15 = true;
    result += "L15 ";
  }

  var pattern = /L17-/m;
  if (pattern.test(text)) {
    L17 = true;
    result += "L17 ";
  }

  var pattern = /L19-/m;
  if (pattern.test(text)) {
    L19 = true;
    result += "L19 ";
  }

  var pattern = /L21-/m;
  if (pattern.test(text)) {
    L21 = true;
    result += "L21 ";
  }

  var pattern = /L23-/m;
  if (pattern.test(text)) {
    L23 = true;
    result += "L23 ";
  }

  var pattern = /L25-/m;
  if (pattern.test(text)) {
    L25 = true;
    result += "L25 ";
  }

  var pattern = /L27-/m;
  if (pattern.test(text)) {
    L27 = true;
    result += "L27 ";
  }

  var pattern = /L29-/m;
  if (pattern.test(text)) {
    L29 = true;
    result += "L29 ";
  }

  var pattern = /L31-/m;
  if (pattern.test(text)) {
    L31 = true;
    result += "L31 ";
  }

  var pattern = /L33-/m;
  if (pattern.test(text)) {
    L33 = true;
    result += "L33 ";
  }

  var pattern = /L35-/m;
  if (pattern.test(text)) {
    L35 = true;
    result += "L35 ";
  }

  var pattern = /L37-/m;
  if (pattern.test(text)) {
    L37 = true;
    result += "L37 ";
  }

  var pattern = /L39-/m;
  if (pattern.test(text)) {
    L39 = true;
    result += "L39 ";
  }

  var pattern = /L41-/m;
  if (pattern.test(text)) {
    L41 = true;
    result += "L41 ";
  }

  var pattern = /L43-/m;
  if (pattern.test(text)) {
    L43 = true;
    result += "L43 ";
  }

  var pattern = /L45-/m;
  if (pattern.test(text)) {
    L45 = true;
    result += "L45 ";
  }

  var pattern = /L47-/m;
  if (pattern.test(text)) {
    L47 = true;
    result += "L47 ";
  }

  var pattern = /L49-/m;
  if (pattern.test(text)) {
    L49 = true;
    result += "L49 ";
  }

  var pattern = /L51-/m;
  if (pattern.test(text)) {
    L51 = true;
    result += "L51 ";
  }

  var pattern = /L53-/m;
  if (pattern.test(text)) {
    L53 = true;
    result += "L53 ";
  }

  var pattern = /L55-/m;
  if (pattern.test(text)) {
    L55 = true;
    result += "L55 ";
  }

  var pattern = /L57-/m;
  if (pattern.test(text)) {
    L57 = true;
    result += "L57 ";
  }

  var pattern = /L59-/m;
  if (pattern.test(text)) {
    L59 = true;
    result += "L59 ";
  }

  return result;
};

const getClass = (text2) => {
  var text = text2;
  // var text = document.getElementById("test").value;
  // text = "A2 TA2 B1 TB1 B2 TB2 C2 TC2 E1 TE1 G1 TG1 G2 TG2 L13 L47 L59";
  // const d = new Date("2000-02-07 2:30 PM");
  const d = new Date();
  let hours = d.getHours();
  let mins = d.getMinutes();
  let day = d.getDay();
  var time = hours + ":" + mins;

  var inclass = false;

  //MONDAY THEORY
  if (day == "1" && time > "07:59" && time < "09:00" && text.includes("A1")) {
    inclass = true;
  }
  if (day == "1" && time > "08:59" && time < "10:00" && text.includes("F1")) {
    inclass = true;
  }
  if (day == "1" && time > "09:59" && time < "11:00" && text.includes("D1")) {
    inclass = true;
  }
  if (day == "1" && time > "10:59" && time < "12:00" && text.includes("TB1")) {
    inclass = true;
  }
  if (day == "1" && time > "11:59" && time < "13:00" && text.includes("TG1")) {
    inclass = true;
  }
  if (day == "1" && time > "13:59" && time < "15:00" && text.includes("A2")) {
    inclass = true;
  }
  if (day == "1" && time > "14:59" && time < "16:00" && text.includes("F2")) {
    inclass = true;
  }
  if (day == "1" && time > "15:59" && time < "17:00" && text.includes("D2")) {
    inclass = true;
  }
  if (day == "1" && time > "17:59" && time < "18:00" && text.includes("TB2")) {
    inclass = true;
  }
  if (day == "1" && time > "17:59" && time < "19:00" && text.includes("TG2")) {
    inclass = true;
  }

  //MONDAY LAB
  if (day == "1" && time > "07:59" && time < "09:40" && text.includes("L1")) {
    inclass = true;
  }
  if (day == "1" && time > "09:49" && time < "11:30" && text.includes("L3")) {
    inclass = true;
  }
  if (day == "1" && time > "11:39" && time < "13:20" && text.includes("L5")) {
    inclass = true;
  }
  if (day == "1" && time > "13:59" && time < "15:40" && text.includes("L31")) {
    inclass = true;
  }
  if (day == "1" && time > "15:49" && time < "17:30" && text.includes("L33")) {
    inclass = true;
  }
  if (day == "1" && time > "17:59" && time < "19:20" && text.includes("L35")) {
    inclass = true;
  }

  //TUESDAY THEORY
  if (day == "2" && time > "07:59" && time < "09:00" && text.includes("B1")) {
    inclass = true;
  }
  if (day == "2" && time > "08:59" && time < "10:00" && text.includes("G1")) {
    inclass = true;
  }
  if (day == "2" && time > "09:59" && time < "11:00" && text.includes("E1")) {
    inclass = true;
  }
  if (day == "2" && time > "10:59" && time < "12:00" && text.includes("TC1")) {
    inclass = true;
  }
  if (day == "2" && time > "11:59" && time < "13:00" && text.includes("TAA1")) {
    inclass = true;
  }
  if (day == "2" && time > "13:59" && time < "15:00" && text.includes("B2")) {
    inclass = true;
  }
  if (day == "2" && time > "14:59" && time < "16:00" && text.includes("G2")) {
    inclass = true;
  }
  if (day == "2" && time > "15:59" && time < "17:00" && text.includes("E2")) {
    inclass = true;
  }
  if (day == "2" && time > "16:59" && time < "18:00" && text.includes("TC2")) {
    inclass = true;
  }
  if (day == "2" && time > "17:59" && time < "19:00" && text.includes("TAA2")) {
    inclass = true;
  }

  //TUESDAY LAB
  if (day == "2" && time > "07:59" && time < "09:40" && text.includes("L7")) {
    inclass = true;
  }
  if (day == "2" && time > "09:49" && time < "11:30" && text.includes("L9")) {
    inclass = true;
  }
  if (day == "2" && time > "11:39" && time < "13:20" && text.includes("L11")) {
    inclass = true;
  }
  if (day == "2" && time > "13:59" && time < "15:40" && text.includes("L37")) {
    inclass = true;
  }
  if (day == "2" && time > "15:49" && time < "17:30" && text.includes("L39")) {
    inclass = true;
  }
  if (day == "2" && time > "17:59" && time < "19:20" && text.includes("L41")) {
    inclass = true;
  }

  //WEDNESDAY THEORY
  if (day == "3" && time > "07:59" && time < "09:00" && text.includes("C1")) {
    inclass = true;
  }
  if (day == "3" && time > "08:59" && time < "10:00" && text.includes("A1")) {
    inclass = true;
  }
  if (day == "3" && time > "09:59" && time < "11:00" && text.includes("F1")) {
    inclass = true;
  }
  if (day == "3" && time > "10:59" && time < "12:00" && text.includes("V1")) {
    inclass = true;
  }
  if (day == "3" && time > "11:59" && time < "13:00" && text.includes("V2")) {
    inclass = true;
  }
  if (day == "3" && time > "13:59" && time < "15:00" && text.includes("C2")) {
    inclass = true;
  }
  if (day == "3" && time > "14:59" && time < "16:00" && text.includes("A2")) {
    inclass = true;
  }
  if (day == "3" && time > "15:59" && time < "17:00" && text.includes("F2")) {
    inclass = true;
  }
  if (day == "3" && time > "16:59" && time < "18:00" && text.includes("TD2")) {
    inclass = true;
  }
  if (day == "3" && time > "17:59" && time < "19:00" && text.includes("TBB2")) {
    inclass = true;
  }

  //WEDNESDAY LAB
  if (day == "3" && time > "07:59" && time < "09:40" && text.includes("L13")) {
    inclass = true;
  }
  if (day == "3" && time > "09:49" && time < "11:30" && text.includes("L15")) {
    inclass = true;
  }
  if (day == "3" && time > "11:39" && time < "13:20" && text.includes("L17")) {
    inclass = true;
  }
  if (day == "3" && time > "13:59" && time < "15:40" && text.includes("L43")) {
    inclass = true;
  }
  if (day == "3" && time > "15:49" && time < "17:30" && text.includes("L45")) {
    inclass = true;
  }
  if (day == "3" && time > "17:59" && time < "19:20" && text.includes("L47")) {
    inclass = true;
  }

  //THURSDAY THEORY
  if (day == "4" && time > "07:59" && time < "09:00" && text.includes("D1")) {
    inclass = true;
  }
  if (day == "4" && time > "08:59" && time < "10:00" && text.includes("B1")) {
    inclass = true;
  }
  if (day == "4" && time > "09:59" && time < "11:00" && text.includes("G1")) {
    inclass = true;
  }
  if (day == "4" && time > "10:59" && time < "12:00" && text.includes("TE1")) {
    inclass = true;
  }
  if (day == "4" && time > "11:59" && time < "13:00" && text.includes("TCC1")) {
    inclass = true;
  }
  if (day == "4" && time > "13:59" && time < "15:00" && text.includes("D2")) {
    inclass = true;
  }
  if (day == "4" && time > "14:59" && time < "16:00" && text.includes("B2")) {
    inclass = true;
  }
  if (day == "4" && time > "15:59" && time < "17:00" && text.includes("G2")) {
    inclass = true;
  }
  if (day == "4" && time > "16:59" && time < "18:00" && text.includes("TE2")) {
    inclass = true;
  }
  if (day == "4" && time > "17:59" && time < "19:00" && text.includes("TCC2")) {
    inclass = true;
  }

  //THURSDAY LAB
  if (day == "4" && time > "07:59" && time < "09:40" && text.includes("L19")) {
    inclass = true;
  }
  if (day == "4" && time > "09:49" && time < "11:30" && text.includes("L21")) {
    inclass = true;
  }
  if (day == "4" && time > "11:39" && time < "13:20" && text.includes("L23")) {
    inclass = true;
  }
  if (day == "4" && time > "13:59" && time < "15:40" && text.includes("L49")) {
    inclass = true;
  }
  if (day == "4" && time > "15:49" && time < "17:30" && text.includes("L51")) {
    inclass = true;
  }
  if (day == "4" && time > "17:59" && time < "19:20" && text.includes("L53")) {
    inclass = true;
  }

  //FRIDAY THEORY
  if (day == "5" && time > "07:59" && time < "09:00" && text.includes("E1")) {
    inclass = true;
  }
  if (day == "5" && time > "08:59" && time < "10:00" && text.includes("C1")) {
    inclass = true;
  }
  if (day == "5" && time > "09:59" && time < "11:00" && text.includes("TA1")) {
    inclass = true;
  }
  if (day == "5" && time > "10:59" && time < "12:00" && text.includes("TF1")) {
    inclass = true;
  }
  if (day == "5" && time > "11:59" && time < "13:00" && text.includes("TD1")) {
    inclass = true;
  }
  if (day == "5" && time > "13:59" && time < "15:00" && text.includes("E2")) {
    inclass = true;
  }
  if (day == "5" && time > "14:59" && time < "16:00" && text.includes("C2")) {
    inclass = true;
  }
  if (day == "5" && time > "15:59" && time < "17:00" && text.includes("TA2")) {
    inclass = true;
  }
  if (day == "5" && time > "16:59" && time < "18:00" && text.includes("TF2")) {
    inclass = true;
  }
  if (day == "5" && time > "17:59" && time < "19:00" && text.includes("TDD2")) {
    inclass = true;
  }

  //FRIDAY LAB
  if (day == "5" && time > "07:59" && time < "09:40" && text.includes("L25")) {
    inclass = true;
  }
  if (day == "5" && time > "09:49" && time < "11:30" && text.includes("L27")) {
    inclass = true;
  }
  if (day == "5" && time > "11:39" && time < "13:20" && text.includes("L29")) {
    inclass = true;
  }
  if (day == "5" && time > "13:59" && time < "15:40" && text.includes("L55")) {
    inclass = true;
  }
  if (day == "5" && time > "15:49" && time < "17:30" && text.includes("L57")) {
    inclass = true;
  }
  if (day == "5" && time > "17:59" && time < "19:20" && text.includes("L59")) {
    inclass = true;
  }

  return inclass;
};
