import Link from "next/link";

type MenuItemProps = {
  item: {
    link: string;
    title: string;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <Link
      href={item.link}
      className="text-l uppercase text-white navigation-link"
    >
      {item.title}
    </Link>
  );
};

export default MenuItem;
