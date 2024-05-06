/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';

import BGPokemonImage from '../../../public/pokebola_02.png';
import typeColor from '@/mocks/typeColor';
import PokemonDetails from '../PokemonDetails';
import PokeNotFound from '../PokeNotFound';

interface TypePrimary {
    name: string,
    url: string
}

export default function CardPokemon({ name } : any) {
    const [pokemonData, setPokemonData] = useState<any>({});
    const [image, setImage] = useState<string>('');
    const [type, setType] = useState<TypePrimary>();
    const [types, setTypes] = useState<Array<TypePrimary>>();
    const [flip, setFlip] = useState<boolean>(false);
    const [pokeNotFound, setPokeNotFound] = useState<boolean>(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(res => {
            setPokemonData(res);
            setImage(res.sprites.front_default);
            setType(res.types[0].type);
            setTypes(res.types);
        })
        .catch(e => setPokeNotFound(true));
     }, [name]);

    const typesKey = Object.keys(typeColor);
    const verifyType = typesKey.filter((color) => color === type?.name).toString();

    return (
        <div
            className='cardPokemon'
            style={{backgroundColor: `${typeColor[verifyType]}`}}
            onClick={() => {
                setFlip(!flip);
            }}
        >
            { !flip && !pokeNotFound && (
                <>
                    <Image
                        className='imgPokemonBG'
                        src={BGPokemonImage}
                        alt='Imagem de fundo'
                    />
                    <img
                        className='imgPokemon'
                        src={image}
                        alt={pokemonData.name}
                    />
                    <span className='namePokemon'>{pokemonData.name}</span>
                </>
            )
            ||
            flip && !pokeNotFound && (
                <PokemonDetails
                    types={types}
                    height={pokemonData.height}
                    weight={pokemonData.weight}
                />
            )
            ||
            pokeNotFound && (
                <PokeNotFound />
            )}
        </div>
    );
}