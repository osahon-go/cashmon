import Styled from "styled-components";
import { BsGearWideConnected } from "react-icons/bs";

export const DashWrap = Styled.div`
    position: relative;
    padding: 0 0 200px 0;
    width: 65%;
    margin: 0 auto;

    @media screen and (max-width: 1000px){
        width: 98%;
    }
`;

export const HeaderSection = Styled.div`
    position: relative;
    background-color:#2ecc71;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 999;
`;
export const HeaderTitle = Styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const LogoText = Styled.div`
    font-family: 'Hammersmith One', sans-serif;
    color: #fff;
    font-size: 2em;
`;
export const UserID = Styled.div`
    font-family: 'Work Sans', sans-serif;
    color: #fff;
    font-size: 1.2em;
`;
export const StatusSection = Styled.div`
    background-color: #f9f9f9;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Work Sans', sans-serif;
    color: #fff;
    font-size: 1.2em;
    color: grey;
`;
export const StatusMonth = Styled.div`
  font-size: 0.8em;
`;
export const StatusInfo = Styled.span`
  font-size: 0.8em;
`;

export const MenuBtn = Styled(BsGearWideConnected)`
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    color: #2ecc71;
  }
`;

export const EnterExpense = Styled.div`
    position: sticky;
    bottom: 0;
    margin-top: 40px;
    background-color: #2ecc71;
    padding: 20px;
    display: inline-block;
    border-radius: 15px;
    font-family: 'Work Sans', sans-serif;
    color: #fff;
    cursor: pointer;
`;

export const ElementsWrap = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 700px;
  background: #fff;
  z-index: 99999;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.35s ease;
  visibility: ${(props) => (props.status ? "visible" : "hidden")};
`;

export const EntryHeader = Styled.div`
  font-family: "Hammersmith One", sans-serif;
  color: #2ecc71;
  font-size: 2.5em;
  margin-bottom: 30px;
  text-align: center;
`;

export const EntryForm = Styled.div`
  width: 400px;
  padding: 20px 0;

  @media screen and (max-width: 640px) {
    width: 90%;
  }
`;
export const EntryDate = Styled.div``;
export const EntryCategory = Styled.select`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #bdc3c7;
  font-family: "Work Sans", sans-serif;
  margin-bottom: 20px;
  outline: none;
  text-align: center;
  background-color: transparent;
`;
export const EntryAmount = Styled.input`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #bdc3c7;
  font-family: "Work Sans", sans-serif;
  margin-bottom: 20px;
  outline: none;
  text-align: center;
  background-color: transparent;
`;

export const EntryDetails = Styled.textarea`
  width: calc(100% - 20px);
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  padding: 10px;
`;

export const EntrySubmit = Styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 20px 0;
  font-family: "Hammersmith One", sans-serif;
  color: #2ecc71;
  cursor: pointer;
  text-align: center;
`;

export const Settings = Styled.div`
    width: 150px;
    padding: 30px 5px;
    background-color: #2ecc71;
    position: absolute;
    top: ${(props) => (props.status === true ? "120px" : "-50px")};
    opacity: ${(props) => (props.status === true ? 1 : 0)};
    right: 0;
    z-index: 99;
    transition: all 0.35s ease;
`;

export const SettingLink = Styled.div`
    width: 100%;
    padding: 10px 0;
    text-align: center;
    font-family: "Work Sans", sans-serif;
    color: #fff;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px 0;
    display: ${(props) => (props.type == "static" ? "none" : "block")};
`;
