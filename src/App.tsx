import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./pages/dashboard/layout/dashboard-layout/DashboardLayout";
import Post from "./pages/dashboard/post/Post";
import CreatePost from "./pages/dashboard/post/CreatePost";

function App() {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/" element={<Post />} />
              <Route path="/post/create" element={<CreatePost />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
