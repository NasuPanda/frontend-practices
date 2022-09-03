import styled from 'styled-components';

const SDefaultLink = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`;

const DefaultLink: React.FC = ({ children }) => (
  <SDefaultLink>{children}</SDefaultLink>
);

export default DefaultLink;
