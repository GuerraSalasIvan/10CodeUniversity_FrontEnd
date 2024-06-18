import Link from "next/link";

export default function InscribeEventButton() {
    return(
        <div>
            <Link href={'#'}>
                <span className="bg-primary-600 text-white py-3 px-40 rounded-md">
                    Inscribirse
                </span>
            </Link>
        </div>
    );
}