/****************************************************************************
** SearchDropdown 
** based on Dropdown item
**
**
****************************************************************************/
import React, { useEffect, useState } from 'react'
import Dropdown from './items/Dropdown'
import styled from 'styled-components';
import fuzzysearch from 'fuzzysearch';
import { useGlobalState } from '../store/States';
import VirtualList from './items/VirtualList';


const SearchRow = styled.div`
 background-color: #0000003b;
 position: relative;
   width: 100%;
   border-bottom: 3px solid #5e5e60 ;
   align-items: center;
    padding: 5%;
    display: flex;
    flex-direction: row;
`;
const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width:1.7rem;
  height: 10rem;
  pointer-events: none;
  fill: gray;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  padding-left: 30px;
  box-sizing: border-box;
  background: transparent;
  font-size: medium;
  outline: none;
  &:focus + ${SearchIcon} {
    fill: white; 
  }
`;
const ResetIcon = styled.svg`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  width:1.4rem;
  height: 10rem;
  fill: #3554a3;
`;
const ButtonRow = styled.div`
    padding-top: 1%;    
    padding-bottom: 1%;
    margin-bottom: 5%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-left: 9px;
    background-color: #0000003b;
`;
const Button = styled.button`
    height: 42px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap:5%;
    margin-right: 2%;
    cursor: ${(props) => (props.active ? 'default' : 'pointer')};
    font-size: medium;
    background: transparent;
    border: none;
    color:  ${(props) => !props.active && '#5e5e60'};
pointer-events: ${(props) => (props.active && 'none')};
    &:hover{
    background: #434344;
    border: 2px solid #5e5e60;
    border-radius: 10px;
    fill: 'white';
}
`;
const Item = styled.div`
padding: 10px;
display: flex;
align-items: center;
column-gap: 4%;
cursor: pointer;

  &:hover {
    background-color: #80808053;
    border-radius: 10px;
}
`;

const FavoriteIcon = styled.svg`
width: 1.7rem;
height: 1.2rem;
fill: ${(props) => props.active ? '#f9f9ff' : 'gray'};
stroke:  ${(props) => props.active ? '#f9f9ff' : 'gray'};
cursor: pointer;
`;
const NoItems = styled.div`
display: flex;
justify-content: center;
height: 50%;
padding: 10px;
text-align: center;
align-items: center;
color: #999;
`;

const SearchDropdown = (props) => {
    const { items, favorites, setFavorites } = useGlobalState();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);
    const [view, setView] = useState('all');

    useEffect(() => {
        let filtered;
        if (view === 'favorites') {
            filtered = favorites.filter(item => fuzzysearch(searchTerm.toLowerCase(), item.toLowerCase()));
        } else {
            filtered = items.filter(item => fuzzysearch(searchTerm.toLowerCase(), item.toLowerCase()));
        }
        setFilteredItems(filtered);
    }, [searchTerm, items, view, favorites]);

    const handleSearch = (event) => setSearchTerm(event.target.value);

    const toggleFavorite = (item) => {
        const newFavorites = favorites.includes(item)
            ? favorites.filter(fav => fav !== item)
            : [...favorites, item];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const rowRenderer = ({ key, index, style }) => (
        <Item key={key} style={style} onClick={() => toggleFavorite(filteredItems[index])}>
            <FavoriteIcon
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill={favorites.includes(filteredItems[index]) ? 'lightgray' : 'none'} stroke="lightgray" strokeLinejoin="round" strokeWidth="32" d="M480 208H308L256 48l-52 160H32l140 96l-54 160l138-100l138 100l-54-160Z" />
            </FavoriteIcon>
            {filteredItems[index]}
        </Item >
    );
    const additionalFunc = () => {
        setSearchTerm("");
        setView('all')
    }
    return (
        <Dropdown {...props}
            close={() => { props.close(); additionalFunc() }}
            additionalTriggerFunc={() => additionalFunc()}
        >
            <SearchRow>
                <Input
                    type="text"
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37" />
                </SearchIcon>
                {searchTerm && <ResetIcon onClick={() => setSearchTerm('')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z" />
                </ResetIcon>}
            </SearchRow>
            <ButtonRow>
                <Button active={view === 'favorites' && true} onClick={() => setView('favorites')}>
                    <FavoriteIcon
                        active={view === 'favorites' && true}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path strokeLinejoin="round" strokeWidth="32" d="M480 208H308L256 48l-52 160H32l140 96l-54 160l138-100l138 100l-54-160Z" />
                    </FavoriteIcon>Favorites
                </Button>
                <Button active={view === 'all' && true} onClick={() => setView('all')}>All Coins</Button>
            </ButtonRow>
            {
                filteredItems.length === 0 ? (
                    <NoItems>No items found in {view}</NoItems>
                ) : (
                    <VirtualList
                        items={filteredItems}
                        itemHeight={40}
                        height={300}
                        renderItem={rowRenderer}
                    />
                )
            }
        </Dropdown >
    )
}

export default SearchDropdown