import './styles.css';
import Image from 'next/image';
import LoadingSvg from '../../../public/loader.svg';

export default function Loading(){
    return (
        <div className='loadingContainer'>
            <Image
                className='loadingImg'
                src={LoadingSvg}
                alt='Loading image'
            />
        </div>
    );
}