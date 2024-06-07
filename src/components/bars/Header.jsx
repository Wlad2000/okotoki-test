/****************************************************************************
** Header Bar
** contain: SearchDropdown
**
**
****************************************************************************/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SearchDropdown from '../SearchDropdown';
import { useGlobalState } from '../../store/States';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 7%;
padding-left: 10%;
padding-right: 10%;
  border-bottom: 2px solid #434344;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
`;
const Text = styled.div`
  display: flex;
  height: 100%;
  flex:0.5;
  align-items: center;
  cursor: pointer;
  &:hover{
  color: #4c4cd1;

  }
  
`;

const Button = styled.div`
align-items: center;
justify-content: center;
  display: flex;
  height: 42px;
  width: 150px;
    cursor: pointer;
    background: ${(props) => props.active && '#434344'};
border:${(props) => props.active && ' 2px solid #5e5e60'};
border-radius: ${(props) => props.active && '10px'};

    &:hover{
    background: #434344;
    border: 2px solid #5e5e60;
    border-radius: 10px;
}
`;


const Header = () => {
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const { setItems, setFavorites } = useGlobalState();

  useEffect(() => {
    // Fetch data from API
    fetch('https://api-eu.okotoki.com/coins')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      });

    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <Container>
      <Text onClick={() => alert("okotoki test app")}>LOGO</Text>
      <SearchDropdown width='300px' opened={openSearchDropdown} triggerItem={() => (<Button active={openSearchDropdown} onClick={() => setOpenSearchDropdown(!openSearchDropdown)}>🔍  SEARCH</Button>)} />
    </Container >
  )
}

export default Header
