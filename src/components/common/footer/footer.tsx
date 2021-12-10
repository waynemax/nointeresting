import styles from "./footer.module.scss";
import { FC, memo } from "react";
import { useFooterLogic } from "./footer.logic";
import classNames from "classnames";
import { FooterProps } from "./footer.utils";

const FooterComponent: FC<FooterProps> = ({ isLight = false }) => {
  const { navigationRender } = useFooterLogic();
  return (
    <footer
      className={classNames([styles.footerComponent], {
        [styles.footerComponent_light]: isLight,
      })}>
      <div className={styles.footerComponent_actionsPart}>
        <div className={styles.footerComponent_actionsPart_center}>
          <div className={styles.footerComponent_actionsPart_center_contact}>
            <div className={styles.footerComponent_actionsPart_center_title}>
              <span>Связаться с нами</span>
            </div>
            <div className={styles.footerComponent_actionsPart_center_list_item}>
              <a href="mailto:info@megapolis.com">Info@megapolis.com</a>
            </div>
            <div className={styles.footerComponent_actionsPart_center_list_item}>
              <a href="tel:+74997072321">Тех. поддержка: +7 (499) 707-23-21</a>
            </div>
            <div className={styles.footerComponent_actionsPart_center_list_item}>
              <a href="tel:+74959027501">Офис: +7 (495) 902-75-01</a>
            </div>
          </div>
          <div className={styles.footerComponent_actionsPart_center_navigation}>
            <div className={styles.footerComponent_actionsPart_center_title}>
              <span>Комплексные решения</span>
            </div>
            <div>{navigationRender()}</div>
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
