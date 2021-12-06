import styles from "./footer.module.scss";
import { memo } from "react";

const FooterComponent = () => {
  return (
    <footer className={styles.footerComponent}>
      <div className={styles.footerComponent_actionsPart}>
        <div className={styles.footerComponent_actionsPart_center}>
          <div className={styles.footerComponent_actionsPart_center_contact}>
            <div className={styles.footerComponent_actionsPart_center_title}>
              <span>Связаться с нами</span>
            </div>
          </div>
          <div className={styles.footerComponent_actionsPart_center_navigation}>
            <div className={styles.footerComponent_actionsPart_center_title}>
              <span>Связаться с нами</span>
            </div>
            <div>123</div>
          </div>
        </div>
      </div>
      <div className={styles.footerComponent_informationPart}>
        <div className={styles.footerComponent_informationPart_center}>
          <div className={styles.footerComponent_informationPart_center_name}>
            <span>©Megapolis IT</span>
          </div>
          <div className={styles.footerComponent_informationPart_center_address}>
            <span>
              Россия, г. Москва, 123060, 1-й Волоколамский проезд, д. 10 стр. 1, этаж 5, помещение I, комнаты 15, 72-75,
              часть комнаты 80
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
