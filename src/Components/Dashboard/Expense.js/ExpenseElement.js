import Styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

export const ExpenseInfo = Styled.div`
    width: 100%;
    display: block;
`;
export const InfoSection = Styled.div`
    font-family: 'Work Sans', sans-serif;
    border: none;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const InfoTitle = Styled.div`
    font-size: 1.2em; 
    color: #2ecc71;
`;

export const FilterTags = Styled.div`
    font-family: 'Work Sans', sans-serif;
    font-size: 1em;

`;
export const CategoryFilter = Styled.select`
    border: 1px solid #e9e9e9;
    padding: 5px;
    font-family: 'Work Sans', sans-serif;
    border-radius: 10px;  
    outline: none;  
`;
export const DateFilter = Styled.div``;
export const SummarySection = Styled.div`
    width: calc(100% - 40px);
    padding: 10px 0;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #2ecc71;
    color: #fff;
    padding: 0 20px;
`;
export const SummaryCategory = Styled.div`
    font-family: 'Work Sans', sans-serif;
    text-align: center;
    padding: 20px 0;
    font-size: 1.2em;
    transition: all 0.35s ease;

    @media screen and (max-width: 1000px){
        font-size: 1em;
        float: left;
    }
`;
export const SummaryBm = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-family: 'Work Sans', sans-serif;
`;
export const SummaryItem = Styled.div`
    padding: 0 20px;
`;
export const SAmount = Styled.div`
    font-size: 1.2em;
    font-weight: 400;
`;
export const SLabel = Styled.div`
    font-size: 0.9em;
`;

export const EntriesSection = Styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
`;
export const EntryItem = Styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 20px 0 20px;
    font-family: 'Work Sans', sans-serif;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
`;

export const EntryDetails = Styled.div`
    display: flex;
    flex-direction: row;
`;
export const UpdateEntry = Styled.div`
    float: right;
    padding: 1px 0;
`;
export const EditEntry = Styled(AiFillEdit)`
    padding: 2px 5px;
    cursor: pointer;
    transition: all 0.35s ease-in-out;
    color: grey;
    font-size: 1.2em;

    &:hover {
        color: #5bc0de;
    }
`;
export const DeleteEntry = Styled(MdDeleteForever)`
    padding: 2px 5px;
    cursor: pointer;
    transition: all 0.35s ease-in-out;
    color: grey;
    font-size: 1.2em;

    &:hover {
        color: red;
    }
`;
export const StatusInfo = Styled.div`
    padding: 0 10px 0 0;
`;
export const DateEntry = Styled.div`
    padding: 0 10px 0 0;

    &::before {
        content: "-- ";
        color: grey;
    }
`;
export const AmountEntry = Styled.div`
    padding: 0 10px 0 0;

    &::before {
        content: "-- ";
        color: grey;
    }
`;
export const CategoryEntry = Styled.div`
    padding: 0 10px 0 0;

    &::before {
        content: " / ";
        color: grey;
    }
`;
export const SubEntry = Styled.div`
    padding: 0 10px 0 0;

    &::before {
        content: " / ";
        color: grey;
    }
`;
