import { SupportedLangCodes } from "data/translations/translations";
import { useLocale } from "next-intl";
import Link from "next/link";
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
  const locale = useLocale() as SupportedLangCodes;

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
