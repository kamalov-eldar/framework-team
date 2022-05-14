import Painting from "../Paintings/Paintings";
import Header from "../../components/Header/Header";

import style from "./App.module.scss";

function App() {
  return (
    <div className={style.App}>
      <div className={style.Container}>
        <Header className="App-header" />
        <Painting />
        <footer />
      </div>
    </div>
  );
}
export default App;
