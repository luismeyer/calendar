"use client";

import { styled } from "styled-components";

export const StyledCardWrapper = styled.div<{
  relativeTop: number;
  relativeHeight: number;
}>`
  height: ${(props) => props.relativeHeight}%;

  position: absolute;
  top: ${(props) => props.relativeTop}%;
  right: 2px;

  display: flex;
  align-items: center;
`;
