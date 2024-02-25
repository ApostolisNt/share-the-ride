import "./Navigation.scss";
import navigationLinks from "./navigation.json";
import MenuItem from "./MenuItem";

const Navigation = () => {
  return (
    <section className="h-20 bg-slate-300 flex items-center justify-between px-12">
      <h1>Logo</h1>
      <div className="flex gap-12 justify-end items-center mr-12">
        {navigationLinks.links.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Navigation;
