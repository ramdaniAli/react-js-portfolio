import { Box, useTheme } from "@mui/material";
import "theme/textLoader.css";
const TextLoader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        zIndex: 3000, // Ensures the video stays in the background
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div className="container">
        <div className="content">
          <div className="content__container">
            <p className="content__container__text">Hello</p>

            <ul className="content__container__list">
              <li className="content__container__list__item">world !</li>
              <li className="content__container__list__item">coder !</li>
              <li className="content__container__list__item">users !</li>
              <li className="content__container__list__item">uiverse</li>
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TextLoader;
