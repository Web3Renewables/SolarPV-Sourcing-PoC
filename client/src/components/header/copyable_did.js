import styled from "styled-components";
import { Typography } from "antd";

const StyledParagraph = styled(Typography.Paragraph)`
  color: white;
  width: 150px;
`;

const CopyableDid = ({ did }) => (
  <StyledParagraph copyable ellipsis={true}>
    {did}
  </StyledParagraph>
);

export default CopyableDid;
