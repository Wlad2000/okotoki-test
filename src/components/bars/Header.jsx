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
  height: 65px;
padding-left: 10%;
padding-right: 10%;
  border-bottom: 2px solid #434344;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
`;
const Section = styled.div`
  display: flex;
  height: 100%;
width: 40%;
  align-items: center;
  
`;
const Text = styled.p`
  align-items: center;
  cursor: pointer;
  &:hover{
  color: #4c4cd1;
  }
`;

const Button = styled.div`
column-gap:3%;
align-items: center;
justify-content: center;
  display: flex;
  height: 42px;
  width: 120px;
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
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavorites([]);
    }
  }, []);

  return (
    <Container>
      <Section><Text onClick={() => alert("okotoki test app")}>LOGO</Text></Section>
      <SearchDropdown
        opened={openSearchDropdown}
        close={() => setOpenSearchDropdown(false)}
        windowTop='64px' windowLeft={`calc(42% - 150px)`}
        width='270px' height='400px'
        triggerItem={(additionalTriggerFunc) => (
          <Button
            active={openSearchDropdown}
            onClick={() => { setOpenSearchDropdown(!openSearchDropdown); additionalTriggerFunc && additionalTriggerFunc() }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.6em" viewBox="0 0 24 24" fill=' white'>
              <path d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37" />
            </svg>  SEARCH
          </Button >
        )}
      />

    </Container >
  )
}

export default Header
