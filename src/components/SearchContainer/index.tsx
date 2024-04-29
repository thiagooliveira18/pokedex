import Image from 'next/image';
import './styles.css';

import SearchIcon from '../../../public/search.svg';

export default function SearchContainer () {
    return (
        <div className='searchContainer'>
            <input 
                type='search'
                placeholder='Pesquise Aqui.'
                className='inputArea'
            />
            <button
                className='btnSearch'>
                <Image
                    className='imgSearch'
                    src={SearchIcon}
                    alt="Botão de Pesquisa" 
                />
            </button>
        </div>
    );
}