"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Form from "../components/Form/Form";
import Field from "../interfaces/interfaceForm";
import AnimationData from "../../public/animations/gafrico_linha.json";
import CreateNewAccount from "../service/create-account";
import { Poppins } from "next/font/google";

const Animation = dynamic(()=> import("../components/Animation/Animation"), {ssr: false});

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
    style:["normal", "italic"],
})

export default function CreateAccountPage() {
    const router = useRouter();

    const fields: Field[] = [
        { name: "name", label: "Seu primeiro nome", type: "text", required: true, className: "flex flex-col", classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]", classNameLabel: "ml-2 text-[#795300] font-[400]" },
        { name: "email", label: "Seu E-mail", type: "email", required: true, className: "flex flex-col", classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]", classNameLabel: "ml-2 text-[#795300] font-[400]"  },
        { name: "password", label: "Crie uma senha", type: "password", required: true, className: "flex flex-col", classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]", classNameLabel: "ml-2 text-[#795300] font-[400]"  },
    ];
      
    
      const handleSubmit = async (data: Record<string, string | number | boolean>) => {
        const creatingAccount = await CreateNewAccount(data);
        if(creatingAccount.created) {
          console.log("Conta criada com sucesso!");
          router.push("/dashboard");
        } else {
          console.log("Erro ao criar conta!");
        }
      };  
    
      return (
        <div className={`${poppins.className} p-6 bg-[#fafdff]  min-h-screen text-[#0a0a0a] flex flex-col justify-center items-center`}>
          <h1 className="text-xl font-bold mb-2 text-[#795300]">Bem vindo(a) ao Sistema de Gestão Financeira Pessoal</h1>
          <p className="text-[#795300] font-[500] mb-2">Acompanhe suas finanças de forma fácil e interativa, crie sua conta e começe já!</p>
            <div className="flex flex-row mt-4">
              <Animation  data={AnimationData} />
              <Form 
                  fields={fields}
                  onSubmit={handleSubmit}
                  buttonText="Criar Conta"
                  styleFormContainer="w-full min-w-[500px] max-w-[50%] flex flex-col text-black bg-[#efb810] p-4 rounded-lg"
                  styleButtonSubmit="w-[100%] min-w-[200px] h-[40px] mt-4 rounded-lg cursor-pointer text-center bg-[#c39200] text-white text-[18px] font-[400]"
              />
            </div>
        </div>
      );
}