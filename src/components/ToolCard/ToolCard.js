import { useContext } from "react";
import "./ToolCard.css";
import { ThemeContext } from "../services/theme/theme.context";

const ToolCard = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`tool-item-container ${
        theme === "dark" && "tool-item-container-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default ToolCard;
