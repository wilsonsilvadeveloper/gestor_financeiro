import Lottie from "lottie-react";
import AnimationProps from "@/app/interface/animation";

export default function Animation(Animation: AnimationProps) {
    return (
        <Lottie
            animationData={Animation.data}
            loop={Animation.loop || true}
            autoplay={Animation.autoplay || true}
            width={Animation.width}
            height={Animation.height}
            className={Animation.className || ""}
        />
    )
}