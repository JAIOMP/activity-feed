import type { Tour } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { ActivityCard } from '../ActivityCard/ActivityCard';
import styles from './ActivityFeed.module.css';

export const ActivityFeed = () => {
  const [data, setData] = useState({
    links: [],
    page: { size: 20, number: 0 },
    tours: [],
  });
  const [tours, setTours] = useState<Tour[]>([]);

  const fetchActivities = useCallback(() => {
    fetch(
      `https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws/?page=${data.page.number}&size=${data.page.size}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setData(response);
        setTours(response.tours);
      });
  }, [data.page.number, data.page.size]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <div data-testid='activity-feed' className={styles.activities}>
      {tours.map((tour) => (
        <ActivityCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};
