import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  sourceLink: string;
}

const buttonBg = "bg-[#0D3F33]";

const NewsCard: React.FC<NewsCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  sourceLink,
}) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg"
      style={{
        width: "340px",
        height: "398px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          priority={false}
        />
      </div>

      <div
        className="px-5 pt-3.5 flex flex-col justify-between h-[calc(398px-180px)]"
        style={{ paddingBottom: "26px" }}
      >
        <div className="flex flex-col">
          <h3 className="text-black text-xl font-bold mb-1">{title}</h3>

          <p
            className="text-black text-base font-normal mb-2"
            style={{ opacity: 0.8 }}
          >
            {description}
          </p>

          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-base font-normal hover:underline cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {sourceLink}
          </a>
        </div>
        <Link href="/noticia">
          <button
            className={`w-[300px] min-h-[34px] ${buttonBg} hover:bg-opacity-90 transition duration-150 
                     text-white text-base font-bold rounded-lg flex items-center justify-center mt-5 cursor-pointer`}
          >
            Visualizar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
