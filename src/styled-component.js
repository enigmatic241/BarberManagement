import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
export const Flexbox = styled(Box)`
  gap: ${(props) => props.gap};
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-basis: ${(props) => props.fb};
  flex-direction: ${(props) => props.dir};
  font-size: ${(props) => props.fsize};
  font-weight: ${(props) => props.fweight};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  overflow: ${(props) => props.overflow || "auto"};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bColor};
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.minHeight};
  cursor: ${(props) => props.cursor};
  padding: ${(props) => props.pad};
  align-items: ${(props) => props.align || props.center};
  justify-content: ${(props) => props.justify || props.center};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderB};
  border-right: ${(props) => props.borderR};
  border-top: ${(props) => props.borderT};
  border-left: ${(props) => props.borderL};
  box-shadow: ${(props) => props.boxShadow};
  flex-grow: ${(props) => props.grow};
  border-radius: ${(props) => props.bRadius};
  flex-wrap: ${(props) => props.wrap};
  overflow-x: ${(props) => props.overflowX || "hidden"};
  overflow-y: ${(props) => props.overflowY || "auto"};
`;
export const StatusButton = styled(Typography)`
  background: ${(props) => props.bColor};
  width: auto;
  color: ${(props) => props.color};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const SnackbarBox = styled(Flexbox)`
  max-width: 400px;
  width: 100%;
  margin: 0;
`;

export const ImageContainer = styled(Flexbox)`
  width: ${(props) => props.width || "40px"};
  border-radius: 50%;
  height: ${(props) => props.width || "40px"};
  & img {
    height: ${(props) => props.width || "40px"};
    width: ${(props) => props.width || "40px"};
  }
`;
