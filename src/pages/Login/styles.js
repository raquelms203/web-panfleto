import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  background: #b1c9b8;
`;

export const CardLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 50px;
  background-color: white;
  color: black;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  min-height: 80vh;
`;

export const ButtonLogin = styled.div`
  background-color: #4caf50; /* Green */
  width: 150px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

export const Title = styled.p`  
  font:  bold 20px Georgia, serif;
  margin-bottom: 25px;
`;
