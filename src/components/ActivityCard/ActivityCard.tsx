import type { Tour } from '@/types';
import {
  calculateSpeed,
  convertMetersToKm,
  formatDate,
  formatNumberWithCommas,
  formatSeconds,
} from '@/utils';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ tour }: { tour: Tour }) => {
  const creatorAvatarUrl = () => {
    const avatarUrl = tour.creator.avatar.src;
    const width = 50;
    return avatarUrl.replace('{width}', width.toString());
  };
  return (
    <div key={tour.id} className={styles.card} data-testid='activity-card'>
      <div className={styles.cardHeader}>
        <div className={styles.user}>
          <img
            src={creatorAvatarUrl()}
            alt='Creator Avatar'
            className={styles.avatar}
          />
          <div className={styles.userinfo}>
            <span className={styles.username}>{tour.display_name}</span>
            <span>went on a adventure.</span>
            <p>{formatDate(tour.date)}</p>
          </div>
        </div>
        <h2 className={styles.name}>{tour.name}</h2>
      </div>
      <hr />
      <div className={styles.cardContent}>
        <div className={styles.stats}>
          <div>{formatSeconds(tour.time_in_motion)}</div>
          <div>{convertMetersToKm(tour.distance)} km</div>
          <div>{calculateSpeed(tour.distance, tour.time_in_motion)} km/h</div>
          <div>{formatNumberWithCommas(tour.elevation_up)} m</div>
          <div>{formatNumberWithCommas(tour.elevation_down)} m</div>
        </div>
        <div className={styles.images}>
          {tour.images.map((image) => {
            const width = 450;
            const height = 450;
            const url = image.src
              .replace('{width}', width.toString())
              .replace('{height}', height.toString());

            return <img key={image.id} src={url} alt={image.alt} />;
          })}
        </div>
      </div>
    </div>
  );
};
