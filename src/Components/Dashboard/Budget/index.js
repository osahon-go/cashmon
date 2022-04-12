import React, { useState, useEffect } from "react";
import axios from "axios";
import NumberFormatValues from "react-number-format";

//Components

//Styles
import {
  BudgetInfo,
  InfoSection,
  ChartSection,
  ChartLabels,
  LabelDivs,
  LabelTitle,
  LabelAmount,
  LabelHold,
  LabelGroup,
  LabelPer,
  LabelSpan,
  InfoTitle,
  BudgetAmount,
  Utilized,
  BudgetBar,
  BudgetShadow,
  BudgetItem,
  BudgetPercent,
} from "./BudgetElements";

function Budget({ dataFile, budgetAmount }) {
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenses, setExpenses] = useState();
  const [colors, setColors] = useState([]);
  const dataObj = [
    { category: "Transportation", amount: 0, color: "#4b86b4", size: 0 },
    { category: "Clothing", amount: 0, color: "#2a4d69", size: 0 },
    { category: "Donations & Gifts", amount: 0, color: "#FF851B", size: 0 },
    {
      category: "Gadgets & Appliances",
      amount: 0,
      color: "#FF4136",
      size: 0,
    },
    { category: "Food", amount: 0, color: "#dcedc1", size: 0 },
    { category: "Gadgets & Appliances", amount: 0, color: "#a8e6cf", size: 0 },
    {
      category: "Internet & Subscriptions",
      amount: 0,
      color: "#F012BE",
      size: 0,
    },
    { category: "Loans", amount: 0, color: "#85144b", size: 0 },
    {
      category: "Repairs & Maintenance",
      amount: 0,
      color: "#be9b7b",
      size: 0,
    },
    { category: "Telephone", amount: 0, color: "#3c2f2f", size: 0 },
    { category: "Utility", amount: 0, color: "#c0c2ce", size: 0 },
    { category: "Miscellaneous", amount: 0, color: "#afafaf", size: 0 },
    { category: "BUDGET", amount: 0, color: "#2ecc71", size: 0 },
  ];
  const categoryLayout = dataObj;
  let currentAmount = 0;
  let percentLeft = 0;
  let mapTotal = 0;
  let cn = 0;

  (() => {
    if (!dataFile || !budgetAmount) {
    } else {
      const result = dataFile.map((total) => {
        mapTotal = mapTotal + total.amount;
        cn = (mapTotal / budgetAmount.amount) * 100;
        percentLeft = Math.round(100 - cn);
        categoryLayout.map((cate) => {
          const step = cate.category;
          if (step == total.category) {
            cate.amount = cate.amount + total.amount;
            cate.size = Math.round(
              (cate.amount / budgetAmount.amount) * 100,
              1
            );
          }
        });
      });
      currentAmount = budgetAmount.amount;
      // console.log(percentLeft);
    }
  })();

  return (
    <>
      <BudgetInfo>
        <InfoSection>
          <InfoTitle>Budget:</InfoTitle>
          <BudgetAmount>
            <NumberFormatValues
              value={currentAmount}
              thousandsGroupStyle="thousand"
              prefix="&#8358;"
              decimalSeparator="."
              displayType="text"
              type="text"
              thousandSeparator={true}
              allowNegative={true}
            />
          </BudgetAmount>
          <Utilized>
            ({percentLeft == 0 ? 100 : Math.abs(percentLeft)}%{" "}
            {percentLeft < 0 ? "Above Budget" : "Left"})
          </Utilized>
        </InfoSection>
        <ChartSection>
          <BudgetBar>
            <BudgetShadow></BudgetShadow>
            {dataObj.map((data) => (
              <BudgetItem
                key={Math.random(3)}
                itemSize={data.size}
                style={{ backgroundColor: data.color }}
              >
                <BudgetPercent itemSize={data.size}>
                  {data.size}%&nbsp;
                </BudgetPercent>
              </BudgetItem>
            ))}
          </BudgetBar>
        </ChartSection>
        <ChartLabels>
          {categoryLayout.map((x) => {
            return (
              <LabelDivs key={x.color} status={x.amount}>
                <LabelHold>
                  <LabelTitle>{x.category}</LabelTitle>
                  <LabelGroup>
                    <LabelAmount>
                      <NumberFormatValues
                        value={x.amount}
                        thousandsGroupStyle="thousand"
                        prefix="&#8358;"
                        decimalSeparator="."
                        displayType="text"
                        type="text"
                        thousandSeparator={true}
                        allowNegative={true}
                      />
                    </LabelAmount>
                    <LabelPer>
                      <LabelSpan
                        amt={x.size}
                        style={{ backgroundColor: x.color }}
                      ></LabelSpan>
                    </LabelPer>
                  </LabelGroup>
                </LabelHold>
              </LabelDivs>
            );
          })}
        </ChartLabels>
      </BudgetInfo>
    </>
  );
}

export default Budget;
