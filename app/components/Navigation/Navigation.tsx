import "./Navigation.scss";
import navigationLinks from "./navigation.json";
import MenuItem from "./MenuItem";

const Navigation = () => {
  return (
    <section className="navigation">
      <h1 className="navigation_logo">Share the ride</h1>
      <div className="navigation_link_wrapper">
        {navigationLinks.links.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Navigation;
