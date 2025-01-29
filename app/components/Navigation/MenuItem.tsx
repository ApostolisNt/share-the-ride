import { SupportedLangCodes } from "data/translations/translations";
import { useLocale } from "next-intl";
import Link from "next/link";
import { cleanUrlSlash } from "utils/general";

type MenuItemProps = {
  item: {
    link: string;
    title: string;
    class?: string;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  const locale = useLocale() as SupportedLangCodes;

  return (
    <Link
      href={cleanUrlSlash(`/${locale}/${item.link}`)}
      className={`navigation_link`}
    >
      {item.title}
    </Link>
  );
};

export default MenuItem;
