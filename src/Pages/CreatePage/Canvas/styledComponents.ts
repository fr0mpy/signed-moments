import styled from "@mui/material/styles/styled";

export const CanvasContainer = styled('div')(() => ({
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
}));

export const StyledCanvas = styled('canvas')(() => ({
    background: '#dad8d8'
}))