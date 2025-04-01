import Image, { StaticImageData } from "next/image";

export default function Icon({w, h, src, alt, className }: {h?: number, w?: number, src: StaticImageData; alt: string; className?: string }) {
    return (
        <Image layout="intrinsic" src={src} alt={alt} width={w} height={h} className={className}/>
    );
}