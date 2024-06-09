/****************************************************************************
** Dropdown
** 
**
**
****************************************************************************/
import React from 'react'
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const Container = styled.div`
    top:0;
    position: absolute;
    margin-top: ${(props) => props.windowTop && props.windowTop};
    margin-left:${(props) => props.windowLeft && props.windowLeft};
    margin-right:${(props) => props.windowRight && props.windowRight};
    border: 2px solid #5e5e60;
    border-radius: 10px;
    width: ${(props) => props.width ? props.width : '500px'};
    height: ${(props) => props.height ? props.height : '400px'};
    max-height: ${(props) => props.maxWidth ? props.maxWidth : '400px'};
    overflow: hidden;
    z-index: 1000;
    visibility: ${(props) => props.opened ? "visible" : "hidden"};
    opacity: ${(props) => props.opened ? 1 : 0};
    transition: opacity 0.5s ease;
    background:rgba(15, 14, 14, 0.197);
    backdrop-filter : blur(10px);
    `;
const Window = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: transparent;
`

const Dropdown = (props) => {
    return (
        <>
            {props.triggerItem(props.additionalTriggerFunc)}
            <Window onClick={props.close} >
                {
                    createPortal(
                        <Container {...props} onClick={(e) => e.stopPropagation()}>
                            {props.children}
                        </Container >,
                        document.body
                    )
                }
            </Window >
        </>
    )
}

export default Dropdown