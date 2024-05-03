import './styles.css';
import typeColor from '@/mocks/typeColor';

interface Props {
    types: any,
    height: number,
    weight: number
}

export default function PokemonDetails({ types, height, weight } : Props){
    return (
        <div className='cardPokemonBack'>
                <div className='detailsContainer'>
                    <h3>Altura: </h3>
                    <p>{height}</p>
                </div>
                <div className='detailsContainer'>
                    <h3>Peso:</h3>
                    <p>{weight}</p>
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
    )
}