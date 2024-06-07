/****************************************************************************
** Dropdown
** 
**
**
****************************************************************************/
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    margin-top: 1%;
    border: 2px solid #5e5e60;
    border-radius: 10px;
    width: ${(props) => props.width ? props.width : '500px'};
    max-height: ${(props) => props.maxWidth ? props.maxWidth : '400px'};
    overflow: hidden;
    z-index: 1000;
    visibility: ${(props) => props.opened ? "visible" : "hidden"};
    opacity: ${(props) => props.opened ? 1 : 0};
    transition: opacity 0.5s ease;

`;

const Dropdown = (props) => {
    return (
        <div>
            {props.triggerItem()}
            <Container {...props} >
                {props.children}
            </Container >
        </div>
    )
}

export default Dropdown