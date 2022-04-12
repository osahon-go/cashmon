import styled from "styled-components";

export const SetWrap = styled.div`
  width: 400px;
  min-height: 100vh;
  margin: 0 auto 100px auto;
  overflow: hidden;

  @media screen and (max-width: 640px) {
    width: 90%;
  }
`;
export const SetHeader = styled.div`
  font-family: "Hammersmith One", sans-serif;
  color: #2ecc71;
  line-height: 100px;
  text-align: center;
  font-size: 3.5em;
  border-bottom: 1px solid #f9f9f9;
  margin-bottom: 50px;
`;
export const SetBody = styled.div``;
export const SetForm = styled.form`
  position: relative;
`;
export const SetInput = styled.input`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #bdc3c7;
  font-family: "Work Sans", sans-serif;
  margin-bottom: 20px;
  outline: none;
  text-align: center;
`;
export const SetSelect = styled.select`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #bdc3c7;
  font-family: "Work Sans", sans-serif;
  margin-bottom: 20px;
  outline: none;
  text-align: center;
`;

export const SelectBtn = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  font-family: "Work Sans", sans-serif;
  text-align: center;
  cursor: pointer;
  padding: 20px 0;
  transition: color 0.35s ease;
  outline: none;

  &:hover {
    color: #2ecc71;
  }
`;

export const SectionTitle = styled.p`
  font-size: 1.1em;
  color: #bdc3c7;
  font-family: "Work Sans", sans-serif;
  text-align: center;
`;

export const AllocateBtn = styled.span`
  background-color: ${(props) => (props.set > 0 ? "#2ecc71" : "#f9f9f9")};
  color: ${(props) => (props.set > 0 ? "#fff" : "grey")};
  cursor: ${(props) => (props.set > 0 ? "pointer" : "arrow")};
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  top: 425px;
  right: 0;
  font-family: "Work Sans", sans-serif;
  font-size: 0.8em;
`;

export const Allocations = styled.div`
  width: calc(100% - 10px);
  margin: 5px 0 20px 0;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 5px;
`;

export const SelectSwitch = styled.div`
  width: calc(100% - 40px);
  position: relative;
  display: inline-block;
  padding: 20px;
  font-family: "Work Sans", sans-serif;
  text-align: center;
  color: #7f8c8d;
  cursor: pointer;
`;
