import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { ErrorRequest } from "@/app/interface/error";

export default function Error(erorInfo: ErrorRequest) {
    const { status, message } = erorInfo;
    const router = useRouter();

    useEffect(() => {
        console.error(`Error ${status}: ${message}`);
    }, [status, message]);

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen text-red-600">
            <h1 className="text-4xl font-bold">Error {status}</h1>
            <p className="mt-4 font-medium">{message}</p>
            <Button label="Faça Login"
                disabled={false}
                type="button"
                onClick={()=> router.push("/create-account")}
                className="flex justify-center items-center absolute bottom-[40px] w-[200px] h-[40px] text-white rounded-lg bg-gray-950 cursor-pointer"
            />
        </div>
    );
}