import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import NumberFormatValues from "react-number-format";
import axios from "axios";
import { TransitionGroup } from "react-transition-group";

//Components

import {
  ExpenseInfo,
  InfoSection,
  InfoTitle,
  FilterTags,
  CategoryFilter,
  DateFilter,
  SummarySection,
  SummaryBm,
  SummaryCategory,
  SummaryItem,
  SAmount,
  SLabel,
  EntriesSection,
  EntryItem,
  EntryDetails,
  StatusInfo,
  DateEntry,
  AmountEntry,
  CategoryEntry,
  SubEntry,
  EnterExpense,
  UpdateEntry,
  EditEntry,
  DeleteEntry,
} from "./ExpenseElement";

const Expense = ({ dataFile, totalExpense, handleDelete, handleEdit }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredTotal, setFilteredTotal] = useState();
  const [filteredExpenses, setFilteredExpenses] = useState();
  const [exp, setExp] = useState();
  const categories = [
    "Transportation",
    "Clothing",
    "Donations & Gifts",
    "Entertainment",
    "Food",
    "Gadgets & Electronics",
    "Internet & Subscriptions",
    "Loans",
    "Repairs & Maintenance",
    "Telephone",
    "Utility",
    "Miscellaneous",
  ];

  let { id } = useParams();

  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
    const filterText = e.target.value;
    let value = {};
    {
      filterText == "All"
        ? setFilteredExpenses(null)
        : axios
            .get("http://localhost:3001/filterExpenses", {
              params: { val: e.target.value, id: id },
            })
            .then((response) => {
              setFilteredTotal(
                response.data.data.total.sum
                  ? response.data.data.total.sum
                  : "No Data"
              );
              setFilteredExpenses(
                response.data.data.fields
                  ? response.data.data.fields
                  : "No Entry"
              );
            })
            .catch((error) => console.error(error));
    }
  };

  const [a, b] = "";

  return (
    <>
      <ExpenseInfo>
        <InfoSection>
          <InfoTitle>Expenses</InfoTitle>
          <FilterTags>
            <CategoryFilter onChange={handleFilter}>
              <option value="All">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </CategoryFilter>
          </FilterTags>
        </InfoSection>
        <SummarySection>
          <SummaryCategory>{filterCategory}</SummaryCategory>
          <SummaryBm>
            <SummaryItem>
              <SAmount>
                <NumberFormatValues
                  value={filteredExpenses ? filteredTotal : totalExpense}
                  thousandsGroupStyle="thousand"
                  prefix="&#8358;"
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                />
              </SAmount>
              {/* <SLabel>SPENT</SLabel> */}
            </SummaryItem>
            {/* <SummaryItem>
              <SAmount>N20,000</SAmount>
              <SLabel>ALLOCATED</SLabel>
            </SummaryItem> */}
          </SummaryBm>
        </SummarySection>
        <EntriesSection>
          {!dataFile ? (
            <EntryItem>
              <StatusInfo>Loading...</StatusInfo>
            </EntryItem>
          ) : (
            <>
              {filteredExpenses
                ? filteredExpenses.map((expense) => (
                    <EntryItem key={expense._id}>
                      <DateEntry>
                        {dayjs(expense.date).format("D MMM")}
                      </DateEntry>
                      <CategoryEntry>{expense.category}</CategoryEntry>
                      <SubEntry>{expense.sub}</SubEntry>
                      <AmountEntry>
                        <NumberFormatValues
                          value={expense.amount}
                          thousandsGroupStyle="thousand"
                          prefix="&#8358;"
                          decimalSeparator="."
                          displayType="text"
                          type="text"
                          thousandSeparator={true}
                          allowNegative={true}
                        />
                      </AmountEntry>
                    </EntryItem>
                  ))
                : dataFile.map((expense) => (
                    <EntryItem key={expense._id}>
                      <EntryDetails>
                        <DateEntry>
                          {dayjs(expense.date).format("D MMM")}
                        </DateEntry>
                        <CategoryEntry>{expense.category}</CategoryEntry>
                        <SubEntry>{expense.sub}</SubEntry>
                        <AmountEntry>
                          <NumberFormatValues
                            value={expense.amount}
                            thousandsGroupStyle="thousand"
                            prefix="&#8358;"
                            decimalSeparator="."
                            displayType="text"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={true}
                          />
                        </AmountEntry>
                      </EntryDetails>
                      <UpdateEntry>
                        <EditEntry
                          onClick={() =>
                            handleEdit(
                              expense._id,
                              expense.date,
                              expense.category,
                              expense.sub,
                              expense.amount,
                              expense.details
                            )
                          }
                        ></EditEntry>
                        <DeleteEntry
                          onClick={() => handleDelete(expense._id)}
                        ></DeleteEntry>
                      </UpdateEntry>
                    </EntryItem>
                  ))}
            </>
          )}
        </EntriesSection>
      </ExpenseInfo>
    </>
  );
};

export default Expense;
