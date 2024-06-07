/****************************************************************************
** SearchDropdown 
** based on Dropdown item
**
**
****************************************************************************/
import React, { useEffect, useState } from 'react'
import Dropdown from './items/Dropdown'
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import fuzzysearch from 'fuzzysearch';
import { useGlobalState } from '../store/States';

const Button = styled.button`
    height: 42px;
    width: 100px;
    margin-left: 6%;
    cursor: pointer;
    font-size: medium;
    background: transparent;
    border: none;
    color:  ${(props) => props.active && '#5e5e60'};
    border-bottom: ${(props) => props.active && ' 2px solid #5e5e60'};
    &:hover{
        background: #434344;
        border: 2px solid #5e5e60;
        border-radius: 10px;
    }
`;

const Row = styled.div`
   width: 100%;
   border-bottom: 3px solid #5e5e60 ;
   align-items: center;
    padding: 3%;
    margin-bottom: 2%;
`;

const Input = styled.input`
  width: 90%;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: none;
  background: transparent;
  font-size: medium;
  outline: none;
`;

const Item = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 6%;
  cursor: pointer;

  &:hover {
    background-color: #80808053;
    border-radius: 10px;
  }
`;

const FavoriteButton = styled.button`
 background: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: large;
  color: ${(props) => (props.isFavorite ? 'gold' : 'gray')};
  &:focus {
    outline: none;
  }
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
            <FavoriteButton
                isFavorite={favorites.includes(filteredItems[index])}
            >
                ★
            </FavoriteButton>
            {filteredItems[index]}
        </Item>
    );
    return (
        <Dropdown {...props}>
            <Row>
                <Input
                    type="text"
                    placeholder="🔍  Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && <span style={{ cursor: 'pointer', color: 'gray', fontSize: 'x-large' }} onClick={() => setSearchTerm('')}>✘</span>}
            </Row>
            <Button active={view === 'favorites' && true} onClick={() => setView('favorites')}> ★ Favorites</Button>
            <Button active={view === 'all' && true} onClick={() => setView('all')}>All</Button>
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List
                        width={width}
                        height={300}
                        rowCount={filteredItems.length}
                        rowHeight={40}
                        rowRenderer={rowRenderer}
                    />
                )}
            </AutoSizer>
        </Dropdown >
    )
}

export default SearchDropdown