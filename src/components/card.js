import styles from "./card.module.css";
function Card({ imageUrl, title, release_date, id }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img alt="no image" src={imageUrl} />
      </div>
      <div className={styles.cardBody}>
        <p>{title}</p>
        <br />
        Release Date : {release_date}
        <br />
        Id : {id}
      </div>
    </div>
  );
}

export default Card;


