import Link from "next/link";

type MenuItemProps = {
  item: {
    link: string;
    title: string;
    class?: string;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  const login = item.class ? ` ${item.class}` : "";

  return (
    <Link href={item.link} className={`navigation_link${login}`}>
      {item.title}
    </Link>
  );
};

export default MenuItem;
