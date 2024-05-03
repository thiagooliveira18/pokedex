'use client'
import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';
import { useEffect, useState } from 'react';
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
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${LIMIT}`)
        .then(res => res.json())
        .then(res => {
            setData(res.results);
            setIsLoading(false);
        })
    },[offset]);

    return (
        <div className='contentContainer'>
            <SearchContainer />
            <div className='pokedexContainer'>                
                {isLoading && <Loading />}
                {
                    data?.map((pokemon: Pokemon) => 
                        <CardPokemon key={pokemon.name} url={pokemon.url} />
                    )
                }
                <div
                    className='arrow left-arrow'
                    style={{cursor: offset === 0 ? 'not-allowed' : 'pointer'}}
                    onClick={() => {
                        if(offset <= 0 || offset == 1) {
                            setOffset(0);
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