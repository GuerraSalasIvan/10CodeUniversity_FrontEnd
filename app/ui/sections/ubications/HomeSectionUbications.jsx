
import TitleBluePadding from '@/app/ui/titles/TitleBluePadding';
import Subtitle from '@/app/ui/titles/Subtitle';
import Carruousel from '@/app/ui/sections/ubications/Carrousel';

export default async function HomeSectionUbications() {
    const ubications = await getData();
    if(!ubications || ubications.length === 0){
        return <p></p>
    }

    return (
        <div className='py-4 px-6'>
            <TitleBluePadding text={'Ubicaciones 10Code University'} />
            <div className='flex items-end px-2 py-4'>
                <Subtitle text={'Uno de los objetivos prioritarios del proyecto Comunidad 10Code University es incrementar la conexión entre todos los alumnos y ex-alumnos de 10Code University repartidos por el mundo. Para ello, se articulan cuatro interesantes programas que fomentan el intercambio de experiencias y potencian la colaboración mutua.'} />
            </div>
            <Carruousel data={ubications}/>
        </div>
    );
}

async function getData() {
        try {
        const response = await fetch("http://127.0.0.1:8000/api/ubications", {cache:'no-store'});
        const data = await response.json();
        return data;

        } catch (error) {
        return [];
        }
    }


