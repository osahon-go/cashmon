import Styled from "styled-components";

export const BodyWrap = Styled.div`
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 640px){
        width: 100%;
    }
`;
export const AuthSection = Styled.div`
    position: relative;
    width: 400px;
    min-height: 350px;
    border-radius: 10px;
    padding: 10px 20px 20px 20px;

    @media screen and (max-width: 640px){
        width: 90%;
        padding: 0;
    }
`;

export const AuthTitle = Styled.div`
    color: #2ecc71;
    font-family: 'Hammersmith One', sans-serif;
    text-align: center;
    padding: 5px 0;
    font-size: 3.5em;
    border-bottom-color: blue;
`;

export const AuthType = Styled.div`
    width: 100%;
    padding: 10px 0;
`;

export const AuthSwitch = Styled.div`
    position: absolute;
    display: inline-block;
    bottom: 0;
    padding: 20px;
    font-family: 'Work Sans', sans-serif;
    text-align: center;    
    color: #7f8c8d;
    cursor: pointer;
`;
