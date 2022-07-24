import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";

function App() {
  return (
    <>
      <div className="container">
        <PageTitle />
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        toastOptions={{ style: { fontSize: "1.4rem" } }}
        position="bottom-right"
      />
    </>
  );
}

export default App;
