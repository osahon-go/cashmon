import styled from "styled-components";
import { Link } from "react-router-dom";

export const SelectWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const SelectBox = styled.div`
  width: 500px;
  padding: 20px 0;
  background-color: #f9f9f9;
  border-radius: 10px;
  transition: all 0.35s ease;

  @media screen and (max-width: 1000px) {
    width: 90%;
  }
`;
export const SelectGreet = styled.div`
  font-family: "Hammersmith One", sans-serif;
  color: #2ecc71;
  font-size: 3.5em;
  margin-bottom: 20px;
`;
export const SelectList = styled.div``;
export const ListHeader = styled.div`
  font-family: "Work Sans", sans-serif;
  font-size: 1rem;
  margin-bottom: 40px;
`;
export const ListBody = styled.div``;

export const BudgetItem = styled(Link)`
  position: relative;
  text-decoration: none;
  font-family: "Work Sans", sans-serif;
  transition: all 0.35s ease;
  padding: 0 0 30px 0;
`;
export const BudgetNumber = styled.div`
  color: #2ecc71;
`;

export const BudgetInfo = styled.div`
  font-size: 0.9em;
  color: grey;
`;
export const SelectSwitch = styled.div`
  position: absolute;
  display: inline-block;
  bottom: 0;
  padding: 20px;
  font-family: "Work Sans", sans-serif;
  text-align: center;
  color: #7f8c8d;
  cursor: pointer;
`;
