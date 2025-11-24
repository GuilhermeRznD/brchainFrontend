import NewsListItem from "@/components/ui/NewsListItem";
import Link from "next/link";

const MOCK_REJECTED_NEWS = [
  {
    id: 1,
    title: "OMS emite novas diretrizes para consumo de açúcar",
  },
  {
    id: 2,
    title: "Vacina contra HPV será ampliada para novas faixas etárias",
  },
  {
    id: 3,
    title: "Pesquisa identifica relação entre estresse crônico e hipertensão",
  },
  {
    id: 4,
    title:
      "Especialistas recomendam check-ups anuais para prevenção de doenças",
  },
  {
    id: 5,
    title: "Falta de sono pode afetar a produtividade e saúde emocional",
  },
  {
    id: 6,
    title: "Terapias alternativas ganham espaço no SUS em algumas regiões",
  },
  {
    id: 7,
    title: "Consumo excessivo de álcool afeta fígado e cérebro, dizem médicos",
  },
  {
    id: 8,
    title:
      "Alerta para aumento de casos de bronquiolite em bebês durante o inverno",
  },
  {
    id: 9,
    title: "Alimentos ricos em fibras ajudam no controle da glicemia",
  },
  {
    id: 10,
    title: "Nova vacina contra chikungunya é aprovada pela Anvisa",
  },
];

const ARROW_ICON_PATH = "/icons/arrow-right.svg";

const NoticiasReprovadasContent: React.FC = () => {
  const handleItemClick = (title: string) => {
    alert(`Clicou na notícia reprovada: ${title}`);
  };

  return (
    <div>
      <h1 className="text-[42px] font-bold mb-10 text-black">
        Notícias Reprovadas
      </h1>

      <div>
        <Link href="/reprovada">
          {MOCK_REJECTED_NEWS.map((news) => (
            <NewsListItem
              key={news.id}
              title={news.title}
              statusColor={"#F45252"}
              arrowIconPath={ARROW_ICON_PATH}
            />
          ))}
        </Link>
      </div>
    </div>
  );
};

export default NoticiasReprovadasContent;
