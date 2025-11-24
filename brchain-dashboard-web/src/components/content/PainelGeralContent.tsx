import NewsCard from "@/components/ui/NewsCard";

const MOCK_NEWS = [
  {
    id: 1,
    imageUrl: "/images/mocks/mock1.png",
    imageAlt: "Equipamentos médicos",
    title: "Avanços na prevenção de do...",
    description:
      "Nos últimos anos, diversas pesquisas na área da saúde têm reforçado a importância da prevenção como...",
    sourceLink: "https://www.gov.br/saude",
  },
  {
    id: 2,
    imageUrl: "/images/mocks/mock2.png",
    imageAlt: "Equipamentos médicos",
    title: "Novas estratégias de vacina...",
    description:
      "O Ministério da Saúde ampliou o calendário de imunização para incluir novas vacinas que reforçam...",
    sourceLink: "https://www.ministeriodasaude.gov.br",
  },
  {
    id: 3,
    imageUrl: "/images/mocks/mock3.png",
    imageAlt: "Pessoa colocando luvas",
    title: "Cuidados com a saúde ment...",
    description:
      "Profissionais recomendam práticas simples, como meditação e exercícios leves, para reduzir o...",
    sourceLink: "https://www.paho.org/pt",
  },
  {
    id: 4,
    imageUrl: "/images/mocks/mock4.png",
    imageAlt: "Copo com água",
    title: "A importância da hidratação...",
    description:
      "Manter a ingestão adequada de água é fundamental para evitar complicações como desidratação e queda...",
    sourceLink: "https://www.fiocruz.br",
  },
  {
    id: 5,
    imageUrl: "/images/mocks/mock5.png",
    imageAlt: "Prato saudável",
    title: "Alimentação saudável reduz...",
    description:
      "Pesquisadores apontam que dietas ricas em frutas, legumes e grãos integrais podem reduzir em até 30%...",
    sourceLink: "https://www.ans.gov.br",
  },
  {
    id: 6,
    imageUrl: "/images/mocks/mock6.png",
    imageAlt: "Remédios",
    title: "Uso racional de antibióticos...",
    description:
      "Campanhas alertam para os riscos da automedicação e incentivam o uso responsável de antibióticos para...",
    sourceLink: "https://www.opas.org.br",
  },
];

const PainelGeralContent: React.FC = () => {
  const handleView = (title: string) => {
    alert(`Visualizando notícia: ${title}`);
  };

  return (
    <div>
      <h1 className="text-[42px] font-bold mb-10 text-black">
        Notícias Pendentes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_NEWS.map((news) => (
          <NewsCard
            key={news.id}
            imageUrl={news.imageUrl}
            imageAlt={news.imageAlt}
            title={news.title}
            description={news.description}
            sourceLink={news.sourceLink}
          />
        ))}
      </div>
    </div>
  );
};

export default PainelGeralContent;
