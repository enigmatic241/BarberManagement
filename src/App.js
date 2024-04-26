import SampleAppBar from "./AppBar/AppBar";
import Home from "./Routes/App/Home";
import AppRoutes from "./Routes/Routes";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import Image from "./Images/homeImage.avif";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{
        // background: 'rgb(2, 0, 36)',
        // background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 12%, rgba(0,212,255,1) 100%)',
        background: `url(${Image})`,
        height: '100vh',
        margin: '-8px',
        backgroundSize: 'cover',
      }}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SampleAppBar />
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );

}
