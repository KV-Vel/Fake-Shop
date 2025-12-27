import { Link } from "react-router";
import styles from "./HomePage.module.css";
import chairImg from "../../assets/armchair.png";

export default function HomePage() {
    return (
        <div className={styles.homePageWrapper}>
            <div className={styles.heroSection}>
                <article className={styles.heroSectionDescription}>
                    <h1 className={styles.animated}>Make your home a better place</h1>
                    <p className={styles.animated}>
                        We create thoughtfully crafted furniture for a home that reflects your style
                        and embraces comfort.
                    </p>
                    <Link to="/shop">
                        <button type="button" className={styles.shopNowBtn}>
                            Explore collection
                        </button>
                    </Link>
                </article>

                <article className={`${styles.armChairWrapper} ${styles.animated}`}>
                    <h2>Popular now</h2>
                    <img
                        src={chairImg}
                        alt="armchair with coffee table"
                        className={styles.armChair}
                    />
                    <div className={styles.circle} aria-hidden="true"></div>
                    <div className={styles.newArrival}>New arrival</div>
                </article>
            </div>
        </div>
    );
}
