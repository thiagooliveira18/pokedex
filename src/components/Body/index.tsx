'use client'
import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon';

export default function Body() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10')
        .then(res => res.json())
        .then(res => {
            setData(res.results);
        })
    },[]);
    
    return (
        <div className='contentContainer'>
            <SearchContainer />
            <div className='pokedexContainer'>                
                {
                    data.map((pokemon: any) => 
                        <Pokemon key={pokemon.name} url={pokemon.url} />
                    )
                }
            </div>
        </div>
    );
}