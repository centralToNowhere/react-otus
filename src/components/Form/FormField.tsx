import styled from "@emotion/styled";

export const FormField = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 0 0 calc(100% / 3 - 40px);
  margin: 20px;
  justify-content: end;

  input,
  button {
    margin: 5px 0 0 0;
    min-width: 100px;
  }
`;
