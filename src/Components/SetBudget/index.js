import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

//Components
import {
  SetWrap,
  SetHeader,
  SetBody,
  SetForm,
  SetInput,
  SetSelect,
  SelectBtn,
  SectionTitle,
  AllocateBtn,
  Allocations,
  SelectSwitch,
  //SetDate,
} from "./SetBudgetElements";

//Styling
import "./fixPicker.css";
import { FormHold } from "../Signup/SignupElements";
import { Category } from "./Category";
import axios from "axios";

function SetBudget() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetType, setBudgetType] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [allocation, setAllocation] = useState({
    userid: 0,
    budgetid: 0,
    transportation: 0,
    clothing: 0,
    donations_and_gifts: 0,
    entertainment: 0,
    food: 0,
    gadgets_and_appliances: 0,
    internet_and_subscriptions: 0,
    loans: 0,
    repairs_and_maintenance: 0,
    telephone: 0,
    utility: 0,
    miscellaneous: 0,
  });
  const [entry, setEntry] = useState(""); //Money for allocation
  const [category, setCategory] = useState(""); //store selected category
  const [appended, setAppended] = useState([]);

  const selected = useRef();
  const navigate = useNavigate();

  const handleChange = (date) => setDate(date);

  //Object values sum function
  const sum = (obj) => {
    return Object.keys(obj).reduce(
      (sum, key) => sum + parseFloat(obj[key] || 0),
      0
    );
  };

  //Allocation handling
  const handleAllocation = (e) => {
    e.preventDefault();

    //Check if any of the allocation fields are empty or not set
    if (
      selected.current.value === "Select Category" ||
      entry === "" ||
      entry === 0
    )
      return alert("Nothing to assign");

    //Check if the category has been set before. If so, update and re-render
    if (allocation[category] !== 0) {
      const assigned = allocation[category];
      const prevAllocation = allocation[category];
      allocation[category] = Number(entry);

      const theSum = sum(allocation);
      if (theSum >= budgetAmount) {
        allocation[category] = prevAllocation;
        alert("This allocation will exceed the set Budget Amount!");
        selected.current.value = "Select Category";
        setEntry("");
      } else {
        const newAppend = appended.filter((old) => old !== category + assigned);
        setAppended([...newAppend, category + entry]);
        selected.current.value = "Select Category";
        setEntry("");
      }
    } else {
      //If conditions above are false
      const cl = category;
      const prevAllocation = allocation[cl];
      allocation[cl] = Number(entry);
      const theSum = sum(allocation);
      if (theSum >= budgetAmount) {
        allocation[cl] = prevAllocation;
        alert("This allocation will exceed the set Budget Amount!");
        selected.current.value = "Select Category";
        setEntry("");
      } else {
        setAppended([...appended, cl + entry]);
        selected.current.value = "Select Category";
        setEntry("");
      }
    }
  };

  const setBudget = (e) => {
    e.preventDefault();

    const now = new Date();
    if (dayjs(date).$D < dayjs(now).$D)
      return alert("you can't select the past");
    if (
      budgetName === "" ||
      budgetAmount === "" ||
      budgetType === "" ||
      duration === ""
    )
      return alert("Top 5 fields are mandatory");

    //Get userid
    const user = localStorage.getItem("cashmon-user");
    let randNumber = Math.floor(Math.random() * user);
    allocation["userid"] = user;
    allocation["budgetid"] = randNumber;
    const values = {
      settings: {
        userid: user,
        budgetid: randNumber,
        type: budgetType,
        name: budgetName,
        amount: budgetAmount,
        duration: duration,
        starts: date,
        status: "Active",
        created: new Date(),
      },
      allocated: allocation,
      userID: user,
    };
    axios
      .post("https://cashmonitor.herokuapp.com/Budget", values)
      .then((response) => {
        if (response.status != 200) {
        } else {
          navigate("/select", { replace: true });
        }
      })
      .catch((error) => console.error(error));
  };

  //Remove allocation
  const removeAllocation = (e) => {
    const item = e.target.className;
    const justText = item.replace(/[0-9]/g, "");
    const newAppend = appended.filter((old) => old !== item);
    setAppended([...newAppend]);
    allocation[justText] = 0;
  };

  return (
    <>
      <SetWrap>
        <SetHeader>Cashmon</SetHeader>
        <SetBody>
          <SetForm>
            <SetInput
              type="text"
              placeholder="Enter Name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            ></SetInput>
            <br />
            <SetSelect onChange={(e) => setBudgetType(e.target.value)}>
              <option value="Select Type">Select Type</option>
              <option value="static">Static</option>
              <option value="flexible">Flexible</option>
            </SetSelect>
            <br />
            <SetInput
              type="number"
              placeholder="Enter Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            ></SetInput>
            <br />
            <SetSelect onChange={(e) => setDuration(e.target.value)}>
              <option value="Select Duration">Select Duration</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </SetSelect>
            <br />
            <DatePicker
              selected={date}
              onChange={handleChange}
              className="fixPicker"
            />
            <br />
            <br />
            <SectionTitle>ALLOCATIONS</SectionTitle>
            <br />
            <SetSelect
              ref={selected}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select Category">Select Category</option>
              {Object.keys(Category).map((cat) => {
                const chr = cat.charAt(0);
                return (
                  <option value={cat} key={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                );
              })}
            </SetSelect>
            <SetInput
              type="text"
              value={entry}
              placeholder="Enter Amount"
              onChange={(e) => setEntry(e.target.value)}
            ></SetInput>
            <AllocateBtn onClick={handleAllocation} set={entry}>
              SET
            </AllocateBtn>
            <Allocations>
              {appended.map((x) => {
                const amtVal = x.match(/(\d+)/); //Seperate number from string
                const justText =
                  x.replace(/[0-9]/g, "").charAt(0).toUpperCase() +
                  x.replace(/[0-9]/g, "").slice(1); //replace number with empty string and then first letter uppercase
                return (
                  <div
                    key={x}
                    className={x}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      backgroundColor: "#2ecc71",
                      padding: "3px 5px",
                      borderRadius: "10px",
                      color: "#fff",
                      fontFamily: "Work Sans",
                      margin: "3px",
                    }}
                    onClick={removeAllocation}
                  >
                    {justText}
                    <div
                      style={{
                        backgroundColor: "green",
                        color: "#fff",
                        padding: "3px 5px",
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                    >
                      {amtVal[0]}
                    </div>
                  </div>
                );
              })}
            </Allocations>
            <br />

            <SelectBtn onClick={setBudget}>SET BUDGET</SelectBtn>
          </SetForm>
        </SetBody>
      </SetWrap>
      <SelectSwitch onClick={() => navigate("/select", { replace: true })}>
        Select Budget
      </SelectSwitch>
    </>
  );
}

export default SetBudget;
