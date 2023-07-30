import { Route, Routes } from "react-router-dom";
import Layout from "./componenet/layout/layout";
import ValidationForm from "./componenet/Form/ValidationForm";
import SubmitPage from "./componenet/Form/SubmitPage";

function App() {
  return (
    <Layout>
      <main>
        <Routes>
          <Route path="/" element={<ValidationForm />}></Route>
          <Route path="/submitPage" element={<SubmitPage />}></Route>
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
