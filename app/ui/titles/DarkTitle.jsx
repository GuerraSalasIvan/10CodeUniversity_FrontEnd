'use client'

export default function DarkTitle({text}){
    return(
        <div className="m-2">
            <h1 className="text-2xl text-title-dark-700 font-bold">{text}</h1>
        </div>
    );
}