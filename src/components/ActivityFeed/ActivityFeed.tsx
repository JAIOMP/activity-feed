import type { Tour } from '@/types';
import { useEffect, useState } from 'react';
import { ActivityCard } from '../ActivityCard/ActivityCard';

export const ActivityFeed = () => {
  const [, setData] = useState({ links: [], page: {}, tours: [] });
  const [tours, setTours] = useState<Tour[]>([]);
  useEffect(() => {
    const fetchActivities = () => {
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
    };
    fetchActivities();
  }, []);

  return (
    <div data-testid='activity-feed'>
      {tours.map((tour) => (
        <ActivityCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};
