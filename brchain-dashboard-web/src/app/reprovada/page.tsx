"use client";
import Header from "@/components/common/Header";
import ModalComponent from "@/components/ui/ModalComponent";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK_NEWS_DATA = {
  title: "OMS emite novas diretrizes para consumo de açúcar",
  body: `
        A Organização Mundial da Saúde (OMS) divulgou novas recomendações sobre a quantidade de açúcar que deve ser consumida diariamente. Segundo o órgão, a ingestão de açúcares livres não deve ultrapassar 10% das calorias diárias, sendo o ideal que esse valor fique abaixo de 5% para trazer maiores benefícios à saúde.

A medida tem como objetivo reduzir o risco de doenças crônicas, como obesidade, diabetes tipo 2 e problemas cardiovasculares. Açúcares livres estão presentes não apenas em doces, refrigerantes e produtos industrializados, mas também em sucos de frutas industrializados e alimentos ultraprocessados.

A OMS reforça que substituir bebidas adoçadas por água e adotar uma alimentação mais natural, rica em frutas, verduras e grãos integrais, são passos fundamentais para melhorar a qualidade de vida e prevenir complicações relacionadas ao excesso de açúcar.
    `,
  imageUrl: "/images/mocks/acucar.jpg",
  sourceLink: "https://www.who.int",
  imageAlt: "Tigela com açúcar",
};

const btnBg = "bg-[#0C3A2D]";
const BACK_ICON_PATH = "/images/back.png";

export default function NewsStaticPage() {
  const router = useRouter();

  const handleReportErrorNavigation = () => {
    router.push("/?content=REPORTAR_ERRO");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = () => setIsModalOpen(true);
  const handleReject = () => alert(`Notícia RECUSADA! (Simulação estática)`);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="p-6">
          <div className="">
            <Link href="/">
              <Image
                src={BACK_ICON_PATH}
                alt="Voltar"
                width={46}
                height={46}
                className="mr-2"
              />
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <div className="flex mb-10 space-x-10">
                <div className="w-1/2">
                  <h2 className="text-4xl font-bold text-black">
                    {MOCK_NEWS_DATA.title}
                  </h2>
                  <p className="text-2xl text-[#666] leading-normal whitespace-pre-line">
                    {MOCK_NEWS_DATA.body}
                  </p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <div className="relative w-full h-[540px] mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={MOCK_NEWS_DATA.imageUrl}
                      alt={MOCK_NEWS_DATA.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-black text-2xl font-medium break-all text-center">
                    Fonte:
                    <a
                      href={MOCK_NEWS_DATA.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {MOCK_NEWS_DATA.sourceLink}
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-black text-2xl font-bold">
                  Deseja desfazer a reprovação e voltar para análise?
                </p>
              </div>

              <div className="flex justify-center pt-6 mt-6">
                <button
                  onClick={handleApprove}
                  className={`px-28 py-5.5 ${btnBg} text-white text-2xl font-bold rounded-2xl hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  Desfazer
                </button>
              </div>

              <div className="mt-8 flex justify-center items-center gap-2.5">
                <Image
                  src="/icons/report.svg"
                  alt={MOCK_NEWS_DATA.imageAlt}
                  width={22}
                  height={22}
                />
                <button
                  onClick={handleReportErrorNavigation}
                  className="text-[#666] underline text-2xl cursor-pointer"
                >
                  Reportar Erro
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}

      <ModalComponent
        isOpen={isModalOpen}
        title={
          <>
            <span className="text-foreground font-bold">A </span>
            <span className="font-bold text-red-500">Reprovação</span>
            <span className="text-foreground font-bold">
              {" "}
              foi desfeita com sucesso!
            </span>
          </>
        }
        message="A aprovação foi desfeita com sucesso. A notícia voltou para a lista de notícias pendentes e aguarda uma nova análise."
        buttonText="Voltar para Notícias Reprovadas"
        onButtonClick={() => setIsModalOpen(false)} // TODO: Redirecionar para página de notícias reprovadas
      />
    </>
  );
}
