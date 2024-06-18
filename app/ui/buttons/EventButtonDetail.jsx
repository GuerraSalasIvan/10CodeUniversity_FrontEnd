import Link from "next/link";

export default function EventButtonDetail({eventData}) {
    return(
        <div>
            <Link href={`/home/events/${eventData.id}`}>
                <span className="bg-primary-600 bg-opacity-25 px-3 py-0.5 rounded-2xl text-primary-600 underline text-sm">
                    Ver evento
                </span>
            </Link>
        </div>
    );
}