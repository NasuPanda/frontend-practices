/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

// StyledComponents ライクに
const StyledButton = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff
    cursor: pointer;
}`;

const EmotionComponent: React.FC = () => {
  // CSS をそのまま記述
  const containerStyle = css`
    display: flex;
    justify-content: space-around;
    padding: 8px;
    margin: 8px;
    background-color: #6ce;
    border-radius: 20px;
  `;

  // インラインライクに
  const titleStyle = css({
    width: '80%',
    color: 'red',
    borderRadius: '20px',
  });

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Emotion</h1>
      <StyledButton type="button">This is a button</StyledButton>
    </div>
  );
};

export default EmotionComponent;
