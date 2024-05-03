/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';

import BGPokemonImage from '../../../public/pokebola_02.png';
import typeColor from '@/mocks/typeColor';
import PokemonDetails from '../PokemonDetails';

interface TypePrimary {
    name: string,
    url: string
}

export default function CardPokemon({ url } : any) {
    const [pokemonData, setPokemonData] = useState<any>({});
    const [image, setImage] = useState<string>('');
    const [type, setType] = useState<TypePrimary>();
    const [types, setTypes] = useState<Array<TypePrimary>>();
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setPokemonData(res);
            setImage(res.sprites.front_default);
            setType(res.types[0].type);
            setTypes(res.types);
        });
    }, [url]);

    //console.log(pokemonData);

    const typesKey = Object.keys(typeColor);
    const verifyType = typesKey.filter((color) => color === type?.name).toString();

    return (
        <div
            className='cardPokemon'
            style={{backgroundColor: `${typeColor[verifyType]}`}}
            onClick={() => {
                setModal(!modal);
            }}
        >
            { !modal && (
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
            modal && (
                <PokemonDetails
                    types={types}
                    height={pokemonData.height}
                    weight={pokemonData.weight}
                />
            )}
        </div>
    );
}