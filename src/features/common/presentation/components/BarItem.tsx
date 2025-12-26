import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type BarItemProps = {
  title: string;
  icon: string;
  tag: string;
  pathname: string;
};

function BarItem({ title, icon, tag, pathname }: BarItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${tag}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full h-full p-2 flex flex-col items-center justify-center relative cursor-pointer`}
    >
      <Image
        src={icon}
        alt={title}
        className="text-black"
        width={20}
        height={20}
        priority
      />

      {pathname === `/${tag}` && (
        <motion.span
          layoutId="underline"
          className="absolute bottom-4 h-1 w-4 bg-[#004CFF] rounded"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: [0.2, 1, 0.2],
            transition: {
              duration: 1.0,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
          style={{ originX: 0.5 }}
        />
      )}
    </div>
  );
}

export default BarItem;
