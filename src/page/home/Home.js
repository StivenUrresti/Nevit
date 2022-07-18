import { Provider } from "react-redux";
import User from "../../user/User";
import store from "../../store";

function Home() {
  return (
    <Provider store={store}>
        <User/>
    </Provider>
  );
}

export default Home;