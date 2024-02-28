import "./Navigation.scss";
import navigationLinks from "./navigation.json";
import MenuItem from "./MenuItem";

const Navigation = () => {
  return (
    <section className="relative h-20 flex items-center justify-between px-12 navigation">
      <h1 className="text-l uppercase text-white">Share the ride</h1>
      <div className="flex gap-8 justify-end items-center mr-12">
        {navigationLinks.links.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Navigation;
