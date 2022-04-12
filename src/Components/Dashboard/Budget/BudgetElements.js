import Styled from "styled-components";

export const BudgetInfo = Styled.div`
    position: relative;
    width: 100%;
`;
export const InfoSection = Styled.div`
    font-family: 'Work Sans', sans-serif;
    border: none;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;
export const ChartSection = Styled.div`
    width: 100%; 
    margin: 0 auto;
`;
export const BudgetBar = Styled.div`
    position: relative;
    width: calc(100% - 40px);
    min-height: 50px;
    border-radius: 15px;
    margin: 20px auto;
    display: flex;
    overflow: hidden;
`;
export const BudgetShadow = Styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    min-height: 50px;
    z-index: 99;    
    -webkit-box-shadow: inset 16px 17px 13px -12px rgba(0,0,0,0.23);
-moz-box-shadow: inset 16px 17px 13px -12px rgba(0,0,0,0.23);
box-shadow: inset 16px 17px 13px -12px rgba(0,0,0,0.23);
`;
export const BudgetItem = Styled.div`
    width: ${(props) => props.itemSize + "%"};
    display: flex;
    align-items: center;
    justify-content: end;
    font-family: 'Work Sans', sans-serif;
    font-weight: bold;
    font-size: 1em;
    color: ${(props) => (props.itemSize > 4 ? "#fff" : "transparent")};
    cursor: pointer;
    transition: all 0.35s ease;

    &:hover {
        color: #000 !important;
    }

    @media screen and (max-width: 1000px){
        font-size: 0.8em;
    }

`;
export const BudgetPercent = Styled.div`
`;
export const ChartLabels = Styled.div`
    width: 100%;
    margin: 10px 0 20px 0; 
    text-align: center;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1000px){
        font-size: 0.8em;
    }
`;
export const LabelDivs = Styled.div`
    font-family: 'Work Sans', sans-serif;
    display: ${(props) => (props.status == 0 ? "none" : "block")};
    padding-right: 10px;
    border-bottom: 1px solid #e9e9e9;
    transition: transform .35s ease-in-out;
`;
export const LabelHold = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding-top: 15px;
    line-height: 20px;
`;
export const LabelGroup = Styled.div`
    display: flex;
    flex: column;
`;
export const LabelTitle = Styled.div`
    padding-left: 20px;
`;
export const LabelAmount = Styled.span`
    padding-right: 15px;
`;
export const LabelPer = Styled.div`
    width: 100px;
    height: 20px;
    margin-bottom: 5px;
    margin-right: 50px;
`;
export const LabelSpan = Styled.div`
    position: relative;
    width: ${(props) => props.amt + "%"};
    height: 20px;
    margin-bottom: 5px;
    transition: width 0.35s ease;

    &::after {
        content: "${(props) => (props.amt ? props.amt + "%" : props.amt)}";
        position:absolute;
        left:100%;
        padding-left: 5px;
    }
`;
export const InfoTitle = Styled.div`
    font-size: 1.2em; 
    color: #2ecc71;
`;
export const BudgetAmount = Styled.div`
    margin: 0 10px;
    font-size: 1.2em;
    color:#2ecc71;
`;
export const Utilized = Styled.span`
    color:#2ecc71;
`;
