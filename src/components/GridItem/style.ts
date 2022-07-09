import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackground ? "#fc6998" : "#e2e3e3"};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 266px;
  max-width: 200px;
`;

type IconProps = {
  opacity?: number;
};
export const Icon = styled.img<IconProps>`
  max-width: 100%;
  opacity: ${(props) => props.opacity ?? 1};
`;
