import Image from 'next/image';
import './styles.css';
import SearchContainer from '../SearchContainer';

export default function Body() {
    return (
        <div className='contentContainer'>
            <SearchContainer />
            <div className=''>Pokedex</div>
        </div>
    );
}