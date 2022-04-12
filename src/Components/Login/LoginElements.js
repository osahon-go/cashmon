import Styled from "styled-components";

export const FormHold = Styled.form`
    position: relative;
    width: 400px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    transition: all 0.35s ease;
    margin-right: auto;
    margin-left: auto;
    margin-top: ${(props) => (props.showing != true ? "30px" : "0")};
    opacity: ${(props) => (props.showing != true ? "0" : "1")};
    z-index: ${(props) => (props.showing != true ? "9" : "999")};

    @media screen and (max-width: 640px){
        width: 90%;
    }
`;
export const InputTag = Styled.input`
    border-color: transparent transparent #bdc3c7 transparent;
    border-bottom-width: 1px;
    padding: 10px;
    margin: 5px 0;
    font-family: 'Work Sans', sans-serif;
    font-size: 1rem;
    outline: none;
    text-align: center;
    color: #7f8c8d;
    background-color: transparent;
    width: calc(100% - 20px);
`;

export const EmailValid = Styled.div`
    position: absolute;
    top: 30px;
    width: 10px;
    height: 10px;
    right: 0;
    border-radius: 50%;
    background-color: ${(props) =>
      props.status != "valid" ? "#FFBF00" : "#2ecc71"};
    
`;

export const SubmitForm = Styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    width: 100px;
    margin: 10px auto;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    font-size: 1rem;
    color: #7f8c8d;
`;
