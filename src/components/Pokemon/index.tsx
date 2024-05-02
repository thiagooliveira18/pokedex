/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';

import BGPokemonImage from '../../../public/pokebola_02.png';

const typeColor: any = {
    water: 'rgba(83, 154, 226, 0.8)',
    fire: 'rgba(234, 122, 60, 0.8)',
    grass: 'rgba(113, 197, 88, 0.8)',
    poison: 'rgba(180, 104, 183, 0.8)',
    bug: 'rgba(148, 188, 74, 0.8)',
    steal: 'rgba(180, 104, 183, 0.8)',
    rock: 'rgba(178, 160, 97, 0.8)',
    psychic: 'rgba(229, 112, 155, 0.8)',
    normal: 'rgba(170, 176, 159, 0.8)',
    ice: 'rgba(112, 203, 212, 0.8)',
    ground: 'rgba(204, 159, 79, 0.8)',
    flying: 'rgba(125, 166, 222, 0.8)',
    ghost: 'rgba(132, 106, 182, 0.8)',
    fighting: 'rgba(203, 95, 72, 0.8)',
    fairy: 'rgba(227, 151, 209, 0.8)',
    electric: 'rgba(229, 197, 49, 0.8)',
    dragon: 'rgba(106, 123, 175, 0.8)',
    dark: 'rgba(115, 108, 117, 0.8)'
}

export default function Pokemon({ url } : any) {
    const [pokemonData, setPokemonData] = useState<any>({});
    const [image, setImage] = useState<any>('');
    const [type, setType] = useState<any>({});
    const [types, setTypes] = useState<any>();
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

    console.log(pokemonData);

    const typesKey = Object.keys(typeColor);
    const verifyType = typesKey.filter((color) => color === type.name).toString();

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
                <div className='cardPokemonBack'>
                    <div className='detailsContainer'>
                        <h3>Altura: </h3>
                        <p>{pokemonData.height}</p>
                    </div>
                    <div className='detailsContainer'>
                        <h3>Peso:</h3>
                        <p>{pokemonData.weight}</p>
                    </div>
                    <div>
                        <h3>Tipo: </h3>
                        {
                            types.map((tp:any, index:number) => (
                                <div
                                    className='typePokemon'
                                    style={{backgroundImage: `linear-gradient(to bottom right,rgba(2555,255,255,0.5),${typeColor[tp.type.name]})`}}
                                    key={index}
                                >
                                        {tp.type.name}
                                    </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}