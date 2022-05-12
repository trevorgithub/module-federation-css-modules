import React from "react";
import styles from "./ButtonContainer-styles.scss";
import FederatedWrapper from "./FederatedWrapper";

const MyButton = React.lazy(() => import("my-button/Button"));

const ButtonContainer = () => {
  return (
    <div className={styles.buttonContainer}>
      I'm the button container!
      <FederatedWrapper
        error={<div>Failed to load button</div>}
        delayed={<div>Loading button...</div>}
      >
        <MyButton />
      </FederatedWrapper>
    </div>
  );
};
export default ButtonContainer;
