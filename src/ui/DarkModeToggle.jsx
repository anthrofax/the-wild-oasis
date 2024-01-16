import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, handleToggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={handleToggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
