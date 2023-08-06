import Button from "./Button";
import { usePathname } from "next/navigation";

const Header = ({ onAdd, showAdd }) => {
  const location = usePathname();
  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {location === "/" && (
        <Button
          bgcolor={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

export default Header;
