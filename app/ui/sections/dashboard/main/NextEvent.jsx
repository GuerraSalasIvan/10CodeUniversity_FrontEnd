import DarkTitle from '@/app/ui/titles/DarkTitle';
import DashBoardEvent from '@/app/ui/cards/events/DashBoardEvent';


export default function NextEvent() {
    return(
        <div>
            <DarkTitle text={'Próximos eventos'}/>
            <DashBoardEvent />
        </div>
    );
}