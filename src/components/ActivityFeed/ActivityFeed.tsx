import type { Tour } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityCard } from '../ActivityCard/ActivityCard';
import styles from './ActivityFeed.module.css';

export const ActivityFeed = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageNumber = useRef(0);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const fetchActivities = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws/?page=${pageNumber.current}`,
      );
      const result = await response.json();

      if (result.tours.length === 0) {
        setHasMore(false);
      } else {
        setTours((prev) => [...prev, ...result.tours]); // Append new results
        pageNumber.current += 1;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchActivities();
        }
      },
      { threshold: 1.0 },
    );

    if (lastElementRef.current) {
      currentObserver.observe(lastElementRef.current);
    }

    return () => currentObserver.disconnect();
  }, [fetchActivities, hasMore, loading]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div data-testid='activity-feed' className={styles.activities}>
      {tours.map((tour) => (
        <ActivityCard key={tour.id} tour={tour} />
      ))}
      {/* Last element to detect scroll end */}
      <div ref={lastElementRef} style={{ height: '20px' }} />
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>Loading, please wait...</p>
        </div>
      )}
    </div>
  );
};
