import styles from "./UpperSec.module.css";

import { Button } from "@mantine/core";
import { HOME_DATA } from "@/utils/constants/staticData";
import Image from "next/image";
import { useRouter } from "next/router";

const UpperSec = () => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/contact");
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.LeftSec}>
        <div className={styles.LeftSecTitle}>
          <h2>{HOME_DATA.title}</h2>
          {/* <h3>{HOME_DATA.description}</h3> */}
        </div>
        {/* <Button
          name={HOME_DATA.button}
          onClick={handleClick}
          primaryColor={"var(--dark-blue)"}
        /> */}
      </div>
      <div className={styles.RightSec}>
        <Image
          src={HOME_DATA.images.MAIN_IMAGE}
          alt=""
          className={styles.MainImage}
        />
      </div>
    </div>
  );
};

export default UpperSec;
