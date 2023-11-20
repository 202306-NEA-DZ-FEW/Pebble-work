import * as React from "react";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <div className='flex justify-center'>
            <Image src={"/images/404.png"} width={800} height={800} />
        </div>
    );
}
