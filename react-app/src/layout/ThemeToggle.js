import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {/* Show the appropriate icon based on the current theme */}
      {document.body.classList.contains('dark-theme') ? (
        <Brightness7 />  // Sun icon for light mode
      ) : (
        <Brightness4 />  // Moon icon for dark mode
      )}
    </IconButton>
  );
};

export default ThemeToggle;
