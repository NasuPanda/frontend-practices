import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  margin: 8px;
  background-color: #6ce;
  border-radius: 20px;
`;
const Title = styled.h1`
  color: red;
`;
const Button = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff
    cursor: pointer;
  }
`;

const StyledComponentsComponent: React.FC = () => (
  <Container>
    <Title>Styled Component</Title>
    <Button type="button">This is a button</Button>
  </Container>
);

export default StyledComponentsComponent;
