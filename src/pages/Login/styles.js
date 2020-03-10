import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Login__wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  img {
    max-width: 250px;
    margin-bottom: 10px;
  }
`;
export const TextField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
