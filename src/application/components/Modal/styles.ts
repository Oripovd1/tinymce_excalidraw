import styled from "styled-components";

interface ContainerProps {
  display: string;
}

export const Container = styled.div<ContainerProps>`
  display: ${(props) => props.display};
  position: fixed;
  z-index: 1309;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Modal = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  margin: auto;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  top: 10%;
  @media (max-width: 1080px) {
    width: 70%;
  }
  @media (min-width: 1080px) {
    width: 70%;
  }
  @media (max-width: 720px) {
    width: 80%;
  }
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 10%;
      opacity: 1;
    }
  }
`;

export const Button = styled.button`
  background: none;
  outline: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  height: 36px;
`;

export const PrimaryButton = styled(Button)`
  background-color: #228be6;
  color: #fff;
  &:hover {
    background-color: #1c7ed6;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #fff;
  border-color: #ced4da;
  color: #000;
  &:hover {
    background-color: #f8f9fa;
  }
`;
