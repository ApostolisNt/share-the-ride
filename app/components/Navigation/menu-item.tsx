import Link from "next/link";
import { useParams } from "next/navigation";
import { cleanUrlSlash } from "utils/general";

type MenuItemProps = {
  item: {
    link: string;
    title: string;
    auth?: boolean;
  };
  setIsMenuOpen: (value: boolean) => void;
};

const MenuItem = ({ item, setIsMenuOpen }: MenuItemProps) => {
  const { locale } = useParams();

  return (
    <Link
      href={cleanUrlSlash(`/${locale}/${item.link}`)}
      className={`navigation_link`}
      onClick={() => setIsMenuOpen(false)}
    >
      {item.title}
    </Link>
  );
};

export default MenuItem;
