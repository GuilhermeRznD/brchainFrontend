"use client";
import Header from "@/components/common/Header";
import ModalComponent from "@/components/ui/ModalComponent";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK_NEWS_DATA = {
  title: "Avanços na prevenção de doenças crônicas",
  body: `
        Nos últimos anos, diversas pesquisas na área da saúde têm reforçado a importância da prevenção como principal estratégia contra doenças crônicas, como diabetes, hipertensão e obesidade. Estudos realizados por instituições públicas e privadas mostram que pequenas mudanças de hábito podem gerar impactos significativos na qualidade de vida da população.

 Entre as recomendações estão a prática regular de atividades físicas, o consumo de frutas, legumes e alimentos naturais, além do controle de fatores de risco, como tabagismo e sedentarismo. O Ministério da Saúde tem investido em programas de incentivo à alimentação saudável e em campanhas de conscientização para reduzir o avanço dessas enfermidades, que continuam sendo um dos principais problemas de saúde pública no Brasil.
    `,
  imageUrl: "/images/mocks/mockk.jpg",
  sourceLink: "https://www.gov.br/saude",
  imageAlt: "Equipamentos médicos",
};

const approveBg = "bg-[#13930D]";
const rejectBg = "bg-[#DD2424]";
const BACK_ICON_PATH = "/images/back.png";

export default function NewsStaticPage() {
  const router = useRouter();

  const handleReportErrorNavigation = () => {
    router.push("/?content=REPORTAR_ERRO");
  };

  const [isModalOpen, setIsModalOpen] = useState({
    modalCategorySelection: false,
    modalSuccess: false,
    modalFailedApproval: false,
  });

  const handleApprove = () =>
    setIsModalOpen({ ...isModalOpen, modalCategorySelection: true });

  const handleReject = () =>
    setIsModalOpen({ ...isModalOpen, modalFailedApproval: true });

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

              <div className="flex justify-center gap-33 pt-6 mt-6">
                <button
                  onClick={handleApprove}
                  className={`px-28 py-5.5 ${approveBg} text-white text-2xl font-bold rounded-2xl hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  Aprovar
                </button>

                <button
                  onClick={handleReject}
                  className={`px-28 py-5.5 ${rejectBg} text-white text-2xl font-bold rounded-2xl hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  Recusar
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

      {/* MODAL DE ESCOLHA DE CATEGORIA DA NOTICIA*/}

      <ModalComponent
        isOpen={isModalOpen.modalCategorySelection}
        title="Selecione a categoria da notícia:"
        buttonText="Concluir"
        options={["Notícia", "Dicas de Saúde", "Artigos Científicos"]}
        onButtonClick={() =>
          setIsModalOpen({
            ...isModalOpen,
            modalCategorySelection: false,
            modalSuccess: true,
          })
        }
      />

      {/* MODAL DE SUCESSO NA APROVAÇÃO DA NOTICIA */}

      <ModalComponent
        type="success"
        isOpen={isModalOpen.modalSuccess}
        title={
          <>
            <span className="text-foreground font-bold">A notícia foi </span>
            <span className="font-bold text-green-600">Aprovada </span>
            <span className="text-foreground font-bold"> com sucesso!</span>
          </>
        }
        message="Esta notícia foi aprovada com sucesso. Se quiser revisá-la mais tarde, você pode encontra-lá na aba de gerenciamento de notícias em “Notícias Aprovadas”"
        buttonText="Voltar ao Menu"
        onButtonClick={
          () => setIsModalOpen({ ...isModalOpen, modalSuccess: false }) // TODO: Redirecionar para menu
        }
      />

      {/* MODAL DE SUCESSO NA REPROVAÇÃO DA NOTICIA */}

      <ModalComponent
        type="failed"
        isOpen={isModalOpen.modalFailedApproval}
        title={
          <>
            <span className="text-foreground font-bold">A notícia foi </span>
            <span className="font-bold text-red-600">Reprovada </span>
            <span className="text-foreground font-bold"> com sucesso!</span>
          </>
        }
        message="Esta notícia foi reprovada com sucesso. Se quiser revisá-la mais tarde, você pode encontra-lá na aba de gerenciamento de notícias em “Notícias Reprovadas”."
        buttonText="Voltar ao Menu"
        onButtonClick={
          () => setIsModalOpen({ ...isModalOpen, modalFailedApproval: false }) // TODO: Redirecionar para menu
        }
      />
    </>
  );
}
