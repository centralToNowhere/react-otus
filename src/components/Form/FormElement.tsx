import styled from "@emotion/styled";

export const FormElement = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;

  input,
  label,
  button,
  p {
    line-height: 1.2;
    font-size: 1.2em;
  }
`;
