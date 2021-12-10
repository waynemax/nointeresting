import styles from "../career.module.scss";
import { memo } from "react";

const AboutComponent = () => {
  return (
    <div className={styles.career_center}>
      <div className={styles.career_about}>
        <span>
          Лидирующий в России разработчик интеллектуальных транспортных сервисов и систем в сфере урбанистики.  Мы
          создаём комплексные стратегии цифрового развития  для государства и бизнеса, инфраструктурные технологические
          решения, а также программное и аппаратное обеспечение.
        </span>
      </div>
    </div>
  );
};

export const About = memo(AboutComponent);
