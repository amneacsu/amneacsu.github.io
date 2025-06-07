import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: var(--dark1);
  position: relative;
  z-index: 10;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  white-space: nowrap;
  align-items: center;

  nav {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .octicon, .in {
    fill: #fff;
  }

  .same {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    background: hsla(300, 100%, 50%, 1.00);
    border-radius: 100%;
  }
`;
