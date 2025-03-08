import type { Tour } from '@/types';
import {
  calculateSpeed,
  convertMetersToKm,
  formatDate,
  formatNumberWithCommas,
  formatSeconds,
} from '@/utils';
import type { ReactNode } from 'react';
import { GoArrowBoth, GoArrowDownRight, GoArrowUpRight } from 'react-icons/go';
import { MdOutlineTimer } from 'react-icons/md';
import { TbBrandSpeedtest } from 'react-icons/tb';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ tour }: { tour: Tour }) => {
  const creatorAvatarUrl = () => {
    const avatarUrl = tour.creator.avatar.src;
    const width = 50;
    return avatarUrl.replace('{width}', width.toString());
  };

  const renderIcon = (icon: ReactNode) => {
    return <div className={styles.icon}>{icon}</div>;
  };

  const renderStat = (label: string, icon: ReactNode) => {
    return (
      <div>
        {renderIcon(icon)}
        {label}
      </div>
    );
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
            <span> went on a adventure.</span>
            <p>{formatDate(tour.date)}</p>
          </div>
        </div>
        <h2 className={styles.name}>{tour.name}</h2>
      </div>
      <hr />
      <div className={styles.cardContent}>
        <div className={styles.stats}>
          {renderStat(formatSeconds(tour.time_in_motion), <MdOutlineTimer />)}
          {renderStat(convertMetersToKm(tour.distance), <GoArrowBoth />)}
          {renderStat(
            calculateSpeed(tour.distance, tour.time_in_motion),
            <TbBrandSpeedtest />,
          )}
          {renderStat(
            formatNumberWithCommas(tour.elevation_up),
            <GoArrowUpRight />,
          )}
          {renderStat(
            formatNumberWithCommas(tour.elevation_down),
            <GoArrowDownRight />,
          )}
        </div>
        <ImageGrid images={tour.images} />
      </div>
    </div>
  );
};
