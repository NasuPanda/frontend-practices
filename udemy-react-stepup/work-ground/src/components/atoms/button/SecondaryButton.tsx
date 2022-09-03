import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #11999e;
`;

// NOTE : props は外から受け取るべき
const SecondaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);

export default SecondaryButton;
