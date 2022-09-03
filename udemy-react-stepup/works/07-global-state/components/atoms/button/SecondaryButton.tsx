import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #11999e;
`;

type Props = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// NOTE : props は外から受け取るべき
const SecondaryButton: React.FC<Props> = ({ children, onClick }) => (
  <SButton type="button" onClick={onClick}>
    {children}
  </SButton>
);

export default SecondaryButton;
