import styled from 'styled-components';

const SCard = styled.div`
  background-color: #fff;
  box-shadow: #ddd 0px 0px 4px 2px;
  border-radius: 8px;
  padding: 16px;
`;

const Card: React.FC = ({ children }) => <SCard>{children}</SCard>;

export default Card;
