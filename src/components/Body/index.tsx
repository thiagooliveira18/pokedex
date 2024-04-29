'use client'
import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';
import { useEffect, useState } from 'react';

export default function Body() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setData(res.results);
        })
    },[])
    console.log(data);

    return (
        <div className='contentContainer'>
            <SearchContainer />
            <div className='pokedexContainer'>
                <ul>
                    {
                        data.map((pokemon: any) => 
                            <li key={pokemon.name}>{pokemon.name}</li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}