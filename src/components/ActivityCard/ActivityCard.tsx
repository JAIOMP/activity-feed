import type { Tour } from '@/types';

export const ActivityCard = ({ tour }: { tour: Tour }) => {
  return <div key={tour.id}>{tour.name}</div>;
};
