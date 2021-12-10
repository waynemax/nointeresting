import { memo } from "react";
import { Logo } from "./logo";
import { About } from "./about";
import styles from "./career.module.scss";
import { useGetVacanciesMocks } from "./career.utils";

const careerComponent = () => {
  const vacancies = useGetVacanciesMocks();

  return (
    <div className="w-100">
      <Logo />
      <div className="w-100 display_flex">
        <About />
      </div>
      <div className={styles.career_center}>
        <div className={styles.career_vacancies_header}>
          <span>Вакансии</span>
        </div>
      </div>
      <div className={styles.career_center}>
        <div className={styles.career_vacancies_items}>
          {vacancies.map(({ title, date }, key) => (
            <div className={styles.career_vacancies_item} key={`vacancy${key}`}>
              <div className={styles.career_vacancies_item_title}>
                <span>{title}</span>
              </div>
              <div className={styles.career_vacancies_item_date}>
                <span>{date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Career = memo(careerComponent);
