

import HomeSectionEvent from '@/app/ui/sections/event/HomeSectionEvent';
import HomeSectionUbications from '@/app/ui/sections/ubications/HomeSectionUbications';



export default async function Page() {

    const eventData = await getData();
    return (
        <main>
          <HomeSectionEvent eventData={eventData}/>

          <HomeSectionUbications />
        </main>
    );
}

async function getData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/event/home", {cache:'no-store'});
    const data = await response.json();
    console.log('eventos',data)
    return data.data;

  } catch (error) {
    return [];
  }
}
