import type { Tour } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { ActivityCard } from '../ActivityCard/ActivityCard';
import styles from './ActivityFeed.module.css';

export const ActivityFeed = () => {
  const [, setData] = useState({ links: [], page: {}, tours: [] });
  const [tours, setTours] = useState<Tour[]>([]);

  const fetchActivities = useCallback(() => {
    fetch(
      'https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws/',
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setData(response);
        setTours(response.tours);
      });
  }, []);

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
