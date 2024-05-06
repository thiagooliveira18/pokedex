import Image from 'next/image';
import './styles.css';

import SearchIcon from '../../../public/search.svg';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

interface Props {
    value: string,
    onChange: Function
}

export default function SearchContainer ({ value, onChange }: Props) {

    const [displayValue, setDisplayValue] = useState(value);

    const debouncedChange = useDebounce(onChange, 500);

    function handleChange(event: any){
        setDisplayValue(event.target.value);
        debouncedChange(event.target.value);
    }

    return (
        <div className='searchContainer'>
            <input 
                value={displayValue}
                onChange={handleChange}
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