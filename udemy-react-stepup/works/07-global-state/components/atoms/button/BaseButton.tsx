import styled from 'styled-components';

// 共通部分を切り出したベースとなるボタン
const BaseButton = styled.button`
  color: #fff;
  padding: 6px 24px;
  border: none;
  border-radius: 100px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default BaseButton;
