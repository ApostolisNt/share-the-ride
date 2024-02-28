import Link from "next/link";

type MenuItemProps = {
  item: {
    link: string;
    title: string;
    class?: string;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <Link href={item.link} className={`navigation_link ${item.class}`}>
      {item.title}
    </Link>
  );
};

export default MenuItem;
