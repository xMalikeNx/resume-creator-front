import React, { FC } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../mst/rootStoreContext";
import { SignIn } from "../SignIn";
import { Preloader } from "../Preloader";

const App: FC = () => {
  const { auth } = useStores();

  return (
    <div>
      <Preloader />
      app
      {auth.loading ? "loading" : "not loading"}
      <br />
      <SignIn />
    </div>
  );
};

export default observer(App);
