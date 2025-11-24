"use client";
import Header from "@/components/common/Header";
import ModalComponent from "@/components/ui/ModalComponent";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK_NEWS_DATA = {
  title: "Ministério da Saúde alerta para aumento de casos de dengue",
  body: `
        O Ministério da Saúde emitiu um alerta nacional sobre o crescimento significativo dos casos de dengue em várias regiões do Brasil. A combinação do período chuvoso e altas temperaturas aumenta os focos de reprodução do mosquito Aedes aegypti, principal transmissor da doença.

Para conter o avanço, a população é orientada a redobrar os cuidados com a eliminação de água parada em vasos, pneus, garrafas e caixas d’água. O ministério também reforça a importância da colaboração das comunidades, já que mais de 70% dos focos do mosquito estão dentro das residências.

Entre os principais sintomas da dengue estão febre alta repentina, dores no corpo e nas articulações, manchas avermelhadas na pele e dor atrás dos olhos. Ao apresentar sinais suspeitos, é fundamental buscar atendimento médico para evitar complicações.
    `,
  imageUrl: "/images/mocks/mosquito.jpg",
  sourceLink: "https://www.gov.br/saude",
  imageAlt: "Mosquito da dengue",
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
                  Deseja desfazer a aprovação e voltar para análise?
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
            <span className="font-bold text-green-600">Aprovação</span>
            <span className="text-foreground font-bold">
              {" "}
              foi desfeita com sucesso!
            </span>
          </>
        }
        message="A aprovação foi desfeita com sucesso. A notícia voltou para a lista de notícias pendentes e aguarda uma nova análise."
        buttonText="Voltar para Notícias Aprovadas"
        onButtonClick={() => setIsModalOpen(false)} // TODO: Redirecionar para página de notícias aprovadas
      />
    </>
  );
}
