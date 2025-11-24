import NewsListItem from "@/components/ui/NewsListItem";
import Link from "next/link";

const MOCK_APPROVED_NEWS = [
  {
    id: 1,
    title: "Ministério da Saúde alerta para aumento de casos de dengue",
  },
  {
    id: 2,
    title: "Campanha de vacinação contra gripe começa na próxima semana",
  },
  {
    id: 3,
    title: "Calor intenso aumenta risco de desidratação e insolação",
  },
  {
    id: 4,
    title: "Nova variante do vírus da gripe preocupa autoridades sanitárias",
  },
  {
    id: 5,
    title: "Alerta: baixa umidade do ar pode agravar doenças respiratórias",
  },
  {
    id: 6,
    title: "Saúde mental ganha espaço em campanhas de prevenção",
  },
  {
    id: 7,
    title: "Vacinação infantil tem queda e preocupa especialistas",
  },
  {
    id: 8,
    title: "OMS reforça importância da amamentação nos primeiros seis meses",
  },
  {
    id: 9,
    title: "Cresce o número de brasileiros com obesidade, aponta IBGE",
  },
];

const ARROW_ICON_PATH = "/icons/arrow-right.svg";

const NoticiasAprovadasContent: React.FC = () => {
  return (
    <div>
      <h1 className="text-[42px] font-bold mb-10 text-black">
        Notícias Aprovadas
      </h1>

      <div>
        <Link href="/aprovada">
          {MOCK_APPROVED_NEWS.map((news) => (
            <NewsListItem
              key={news.id}
              title={news.title}
              statusColor={"#20C745"}
              arrowIconPath={ARROW_ICON_PATH}
            />
          ))}
        </Link>
      </div>
    </div>
  );
};

export default NoticiasAprovadasContent;
