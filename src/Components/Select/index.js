import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";

//Components
import {
  SelectWrap,
  SelectBox,
  SelectGreet,
  SelectList,
  ListHeader,
  ListBody,
  BudgetItem,
  BudgetNumber,
  BudgetInfo,
  SelectSwitch,
} from "./SelectElements";
import App from "../../App";
import axios from "axios";

function Select() {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([{}]);
  const [loading, setLoading] = useState(false);

  //Auto load Budgets
  useEffect(() => {
    const user = localStorage.getItem("cashmon-user");
    Axios.get("https://cashmonitor.herokuapp.com/load", {
      params: { id: user },
    })
      .then((response) => {
        setBudgets(response.data);
        setLoading(true);
      })
      .catch((error) => console.error(error));
  }, []);

  //Status conditional rendering
  // let statusInfo = "";
  // (() => {
  //   if (budgets) {
  //     console.log(budgets);
  //     const duration = budgets.duration;
  //     if (duration == "monthly") {
  //       const nw = budgets.starts;
  //       statusInfo =
  //         dayjs(nw).add(1, "month").fromNow("s").split(" days")[0] > 0 ||
  //         dayjs(nw).add(1, "month").fromNow("s").includes("month");
  //     } else {
  //       const wk = budgets.starts;
  //       statusInfo =
  //         dayjs(wk).add(1, "week").fromNow("s").split(" days")[0] > 0;
  //     }
  //   }
  // })();

  const loadingBudgets = budgets.map((x) => {
    const dt = x.created;
    return (
      <BudgetItem key={x.budgetid} to={`/dashboard/${x.budgetid}`} replace>
        <BudgetNumber>
          {x.budgetid}, {x.name}
        </BudgetNumber>
        <BudgetInfo>
          Created&nbsp;
          {/* {x.created}{" "} */}
          {dayjs(dt).format("D MMM, YY")}{" "}
          <span style={{ fontStyle: "italic", color: "#0275d8" }}>
            {x.status}
          </span>
        </BudgetInfo>
        <br />
      </BudgetItem>
    );
  });

  return (
    <>
      <SelectWrap>
        <SelectBox>
          <SelectGreet>Hi</SelectGreet>
          <SelectList>
            <ListHeader>
              Please{" "}
              {budgets ? <>{budgets.length == 0 ? "set" : "select"}</> : "..."}{" "}
              a budget
            </ListHeader>
            <ListBody>
              {loading ? (
                loadingBudgets
              ) : (
                <div style={{ color: "#2ecc71" }}>Loading Budgets...</div>
              )}
              {/* <BudgetNumber>585289, Monthly Allowance</BudgetNumber>
                <BudgetInfo>
                  Created 7 Feb, 22{" "}
                  <span style={{ fontStyle: "italic", color: "#0275d8" }}>
                    Active
                  </span>
                </BudgetInfo> */}
            </ListBody>
          </SelectList>
        </SelectBox>
        <SelectSwitch onClick={() => navigate("/set", { replace: true })}>
          Set Budget
        </SelectSwitch>
      </SelectWrap>
    </>
  );
}

export default Select;
