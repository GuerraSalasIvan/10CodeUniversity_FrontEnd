'use client'

export default function TitleBluePadding({text}){
    return(
        <div className="border-title-color-700 border-2 text-2xl font-bold flex items-center bg-primary-600 bg-opacity-20">
            <h1 className="my-3 mx-4 text-title-color-700">{text}</h1>
        </div>
    );
}