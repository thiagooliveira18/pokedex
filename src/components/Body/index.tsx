'use client'
import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';
import { useEffect, useMemo, useState } from 'react';
import CardPokemon from '../CardPokemon';

import leftArrow from '../../../public/arrow-left.svg';
import rightArrow from '../../../public/arrow-right.svg'
import Loading from '../Loading';

interface Pokemon {
    name: string,
    url: string
}

const LIMIT = 10;

export default function Body() {
    const [data, setData] = useState<Array<Pokemon>>();
    const [searchData, setSearchData] = useState<Pokemon>();
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${LIMIT}`)
        .then(res => res.json())
        .then(res => {
            setData(res.results);
            setIsLoading(false);
        });
    },[offset, searchText]);


    const pokemonSearch = useMemo(() => {
        return searchText.toLowerCase();
    }, [searchText]);

    return (
        <div className='contentContainer'>
            <SearchContainer
                onChange={(str: string) => setSearchText(str)}
                value={searchText}
            />
            <div className='pokedexContainer'>                
                {isLoading && <Loading />}
                {
                    !searchText && (
                        data?.map((pokemon: Pokemon) => 
                            <CardPokemon key={pokemon.name} name={pokemon.name} />
                        )
                    )
                }
                {
                    searchText && (
                        <CardPokemon key={pokemonSearch} name={pokemonSearch} />
                    )
                }

                <div
                    className='arrow left-arrow'
                    style={{cursor: offset === 0 ? 'not-allowed' : 'pointer'}}
                    onClick={() => {
                        if(offset <= 0 || offset == 1) {
                            setOffset(0);
                            setIsLoading(true);
                        }
                        if(offset > 0){
                            setOffset(offset-LIMIT);
                        }
                    }}
                >
                    <Image src={leftArrow} alt='Left arrow' />
                </div>
                <div
                    className='arrow right-arrow'
                    onClick={() => {
                        if(offset<=0){
                            setOffset((offset+LIMIT)+1);
                        }
                        setOffset(offset+LIMIT);
                    }}
                >
                    <Image src={rightArrow} alt='Right arrow' />
                </div>
            </div>
        </div>
    );
}