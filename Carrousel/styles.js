import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 0;
`;

export const Arrow = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  align-items: center;
  color: ${(props) => props.color};
  transition: all 0.3s;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    opacity: 0.7;
  }
`;
