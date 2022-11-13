import styled from 'styled-components';

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
  position: relative;
`;

export const EmptyList = styled.p`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  height: 100px;
  font-size: 24px;
  justify-content: center;
`;
