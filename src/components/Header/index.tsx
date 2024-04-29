import './styles.css';
import Image from "next/image";

import pokebola_01 from '../../../public/pokebola_01.png';
import logo from '../../../public/logo.png';

export default function Header(){
    return (
    <div className='headerContainer'>
        <Image className='imgPokebola' src={pokebola_01} alt='Pokebola' />
        <Image className='imgLogo' src={logo} alt='Logo Pokémon' />
    </div>
    );
}