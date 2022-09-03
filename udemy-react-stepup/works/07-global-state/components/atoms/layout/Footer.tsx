import styled from 'styled-components';

const SFooter = styled.footer`
  background-color: #11999e;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer: React.VFC = () => <SFooter>&copy; 2022 test Inc.</SFooter>;

export default Footer;
