import styled from "styled-components";
import { Layout } from 'antd';

const StyledFooter = styled(Layout.Footer)`
.footer {
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
    justify-content: center;
    align-items: center;
`;

// .footer a {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-grow: 1;
//   }

const Footer = () => (
    <StyledFooter>Footer</StyledFooter>
);

export default Footer;