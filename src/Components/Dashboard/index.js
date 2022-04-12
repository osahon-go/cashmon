import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdArrowBackIosNew } from "react-icons/md";

//Component
import Budget from "./Budget";
import Expense from "./Expense.js";

//CSS
import "./entryFixer.css";

//Styles
import {
  DashWrap,
  HeaderSection,
  HeaderTitle,
  UserID,
  StatusSection,
  StatusMonth,
  StatusInfo,
  LogoText,
  EnterExpense,
  ElementsWrap,
  EntryForm,
  EntryDate,
  EntryCategory,
  EntryAmount,
  EntryHeader,
  EntryDetails,
  EntrySubmit,
  MenuBtn,
  Settings,
  SettingLink,
} from "./DashboardElements";

function Dashboard() {
  const [expensesData, setExpensesData] = useState();
  const [budgetAmount, setBudgetAmount] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [subcategory, setsubcategory] = useState();
  const [sub, setSub] = useState();
  const [launch, setLaunch] = useState(false);
  const [totalExpense, setTotalExpense] = useState();
  const [budgetStatus, setBudgetStatus] = useState();
  const [action, setAction] = useState(false);
  const [openSettings, SetOpenSettings] = useState(false);

  dayjs.extend(relativeTime);

  //Navigation
  let navigate = useNavigate();

  //Ref
  const subCategory = useRef();
  const when = useRef();
  const Cat = useRef();
  const Amt = useRef();
  const Deets = useRef();

  //Params
  let { id } = useParams();

  useEffect(() => {
    const activeUser = localStorage.getItem("cashmon-user");
    if (!activeUser) return navigate("/", { replace: true });
    axios
      .get("https://cashmonitor.herokuapp.com/budgetDetails", {
        params: { id: id },
      })
      .then((response) => {
        const expenses = response.data.expenses;
        setExpensesData(expenses);
        setTotalExpense(
          response.data.totalExpense[0] == undefined
            ? "0.00"
            : response.data.totalExpense[0].sum
        );
        setBudgetAmount(response.data.info);
      })
      .catch((error) => console.error(error));
  }, [launch, action]);

  function leave() {
    localStorage.removeItem("cashmon-user");
    navigate("/", { replace: true });
  }

  const handleChange = (date) => setDate(date);

  const categories = {
    Transportation: [
      "Select Subcategory",
      "Taxi",
      "Public Bus",
      "Bike",
      "Ferry",
      "Airplane",
      "Others",
    ],
    Clothing: ["Select Subcategory", "Ready-made", "Tailored", "Others"],
    "Donations & Gifts": [
      "Select Subcategory",
      "Offering",
      "Committment & Vows",
      "Gifts",
      "Others",
    ],
    Entertainment: [
      "Select Subcategory",
      "Cinema",
      "Events",
      "Hangouts",
      "Recreation",
      "Others",
    ],
    Food: ["Select Subcategory", "Eatery", "Homemade", "Groceries", "Others"],
    "Gadgets & Electronics": ["Select Subcategory", "Household", "Others"],
    "Internet & Subscriptions": [
      "Select Subcategory",
      "Mobile",
      "Cable",
      "Others",
    ],
    Loans: ["Select Subcategory", "Loans"],
    "Repairs & Maintenance": ["Select Subcategory", "Domestic", "Others"],
    Telephone: ["Select Subcategory", "Call Credit", "Others"],
    Utility: [
      "Select Subcategory",
      "Power",
      "Water",
      "Gas",
      "Fuel",
      "Trash & Recycling",
      "Others",
    ],
    Miscellaneous: ["Select Subcategory", "Miscellaneous"],
  };

  const popSub = (e) => {
    const cat = e.target.value;
    if (cat == "Select Category") return setSub("");
    const filteredCat = categories[cat].map((x) => {
      return <option key={x}>{x}</option>;
    });
    setCategory(cat);
    setSub(filteredCat);
    setCategory.current = "Select Subcategory";
  };

  const SubmitExpense = () => {
    if (!category || category == "Select Category")
      return alert("All fields are mandatory!");
    if (!amount || amount <= 0 || !details)
      return alert("All fields are mandatory!");
    const values = {
      budgetId: id,
      date: date,
      category: category,
      sub: subcategory,
      amount: Number(amount),
      details: details,
    };
    axios
      .post("https://cashmonitor.herokuapp.com/updateExpense", {
        values: values,
      })
      .then((response) => {
        const stat = response.data.status;
        const totalExpense = response.data.result.sum;
        if (stat.includes("failed")) return alert("There was an error.");
        setLaunch(!launch);
        setTotalExpense(totalExpense);
        Cat.current.value = "Select Category";
        setDetails("");
        setAmount("");
        setSub("Select Category");
        setDetails("");
      })
      .catch((error) => console.error(error));
  };

  const closeDialog = (e) => {};

  //Status conditional rendering
  let statusInfo = "";
  (() => {
    if (budgetAmount) {
      const duration = budgetAmount.duration;
      if (duration == "monthly") {
        const nw = budgetAmount.starts;
        statusInfo =
          dayjs(nw).add(1, "month").fromNow("s").split(" days")[0] > 0 ||
          dayjs(nw).add(1, "month").fromNow("s").includes("month");
      } else {
        const wk = budgetAmount.starts;
        statusInfo =
          dayjs(wk).add(1, "week").fromNow("s").split(" days")[0] > 0;
      }
    }
  })();

  //Close Expense entry dialog
  const goBack = () => {
    setLaunch(!launch);
  };

  const handleDelete = (e) => {
    const id = e;
    axios
      .get("https://cashmonitor.herokuapp.com/deleteEntry", {
        params: { id: id },
      })
      .then((response) => {
        if (response.data == "Deleted") {
          setAction(!action);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (a, b, c, d, e, f) => {
    when.current.selected = b;
    Cat.current.value = c;
    subCategory.current.value = d;
    Amt.current.value = Number(e);
    Deets.current.value = f;

    setLaunch(!launch);
  };

  const goDelete = (e) => {
    const id = e;
    axios
      .post("https://cashmonitor.herokuapp.com/deleteBudget", { value: id })
      .then((response) => {
        if (response.data.action == "successful") {
          navigate("/select", { replace: true });
        } else {
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {/* <h1>Dashboard</h1>
      <br />
      <button onClick={leave}>Leave</button> */}
      <DashWrap>
        <HeaderSection>
          <HeaderTitle>
            <LogoText>Cashmon</LogoText>
            <UserID>No: {id}</UserID>
          </HeaderTitle>
          <StatusSection>
            <StatusMonth>
              {budgetAmount
                ? budgetAmount.name
                : // ? dayjs(budgetAmount.starts).format("MMM")
                  "Loading..."}
              &nbsp;
              <StatusInfo>
                (
                {statusInfo ? (
                  <>{statusInfo === true ? "Active" : "Completed"}</>
                ) : (
                  "Loading..."
                )}
                )
              </StatusInfo>
            </StatusMonth>
            <MenuBtn onClick={() => SetOpenSettings(!openSettings)}></MenuBtn>
          </StatusSection>
        </HeaderSection>
        <Budget dataFile={expensesData} budgetAmount={budgetAmount} />
        <Expense
          dataFile={expensesData}
          totalExpense={totalExpense}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <EnterExpense onClick={() => setLaunch(!launch)}>
          Enter Expense
        </EnterExpense>

        {/* This is the popup to enter expense */}
        <ElementsWrap status={launch}>
          <MdArrowBackIosNew
            onClick={goBack}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "15px 20px",
              fontSize: "1.4em",
              background: "#2ecc71",
              color: "#fff",
              cursor: "pointer",
            }}
          ></MdArrowBackIosNew>
          <EntryForm>
            <EntryHeader>ADD EXPENSE</EntryHeader>
            <EntryDate></EntryDate>
            <DatePicker
              ref={when}
              selected={date}
              onChange={handleChange}
              className="entryPicker"
            />
            <EntryCategory ref={Cat} onChange={popSub}>
              <option value="Select Category">Select Category</option>
              {Object.keys(categories).map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </EntryCategory>
            <EntryCategory
              ref={subCategory}
              onChange={(e) => setsubcategory(e.target.value)}
            >
              {!sub || sub == "Select Category" ? (
                <option>Awaiting Category</option>
              ) : (
                sub
              )}
            </EntryCategory>
            <EntryAmount
              ref={Amt}
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) =>
                e.target.value <= 0 ? "" : setAmount(e.target.value)
              }
            ></EntryAmount>
            <EntryDetails
              ref={Deets}
              rows="5"
              placeholder="Details"
              text={details}
              onChange={(e) => setDetails(e.target.value)}
            ></EntryDetails>
            <EntrySubmit onClick={SubmitExpense}>Update</EntrySubmit>
          </EntryForm>
        </ElementsWrap>
        <Settings status={openSettings}>
          <SettingLink
            onClick={() => alert("Clicked")}
            type={budgetAmount ? budgetAmount.type : ""}
          >
            Update Budget
          </SettingLink>
          <SettingLink onClick={() => goDelete(budgetAmount.budgetid)}>
            Delete Budget
          </SettingLink>
          <SettingLink onClick={() => navigate("/select", { replace: true })}>
            Select Budget
          </SettingLink>
        </Settings>
      </DashWrap>
    </div>
  );
}

export default Dashboard;
