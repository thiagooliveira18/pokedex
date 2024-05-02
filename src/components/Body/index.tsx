'use client'
import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon';

import leftArrow from '../../../public/arrow-left.svg';
import rightArrow from '../../../public/arrow-right.svg'

const LIMIT = 10;

export default function Body() {
    const [data, setData] = useState<any>([]);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${LIMIT}`)
        .then(res => res.json())
        .then(res => {
            setData(res.results);
        })
    },[offset]);    

    return (
        <div className='contentContainer'>
            <SearchContainer />
            <div className='pokedexContainer'>                
                {
                    data.map((pokemon: any) => 
                        <Pokemon key={pokemon.name} url={pokemon.url} />
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