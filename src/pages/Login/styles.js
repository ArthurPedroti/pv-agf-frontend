import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  text-align: center;
  background-color: rgb(16, 15, 18);
  color: #fff;
`;
export const Login__wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: grid;

  span {
    font-size: 16px;
    line-height: 26px;
    padding: 5px 0;
  }

  .version {
    font-weight: bold;
  }
`;
export const TextField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 2px solid rgb(247, 223, 30);
  background: rgb(16, 15, 18);
  color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  -webkit-transition: all 0.2s ease-in-out;

  :focus {
    box-shadow: 0 0 7px rgb(247, 223, 30);
  }

  ::placeholder {
    color: #fff;
    font-size: 16px;
    line-height: 26px;
  }
`;
export const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  transition: all 200ms ease-in 0s;
  background: rgb(16, 15, 18);
  padding: 12px 15px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(247, 223, 30);
  border-image: initial;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    transition: all 200ms ease-in 0s;
    background: rgb(247, 223, 30);
    color: rgb(16, 15, 18);
  }
`;
