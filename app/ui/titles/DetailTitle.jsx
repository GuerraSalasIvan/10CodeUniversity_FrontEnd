'use client'

export default function DetailTitle({text}){
    return(
        <div className="bg-primary-600 py-6 px-4 flex justify-center">
            <h1 className="text-3xl text-white font-bold">{text.toUpperCase()}</h1>
        </div>
    );
}