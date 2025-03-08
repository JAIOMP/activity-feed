import { render, screen, waitFor } from '@testing-library/react';
import { ActivityFeed } from './ActivityFeed';

const tour = {
  id: '20307720130000',
  name: 'My lively adventure',
  status: 'public',
  date: '2025-01-26T16:30:00.403Z',
  distance: 4149,
  time_in_motion: 4156,
  elevation_up: 462,
  elevation_down: 826,
  creator: {
    username: 'jay',
    avatar: {
      src: 'https://i.pravatar.cc/{width}?u=20307720130000',
      templated: true,
    },
  },
  display_name: 'Jay Kerluke',
  is_premium: 'false',
  images: [
    {
      id: 38631149,
      src: 'https://picsum.photos/seed/38631149/{width}/{height}',
      templated: true,
    },
  ],
  vector_map_image: {
    src: 'https://tourpic-vector.maps.komoot.net/r/big/qps%5DqutH@ACGFAFl@LEHb@LHH@T%3FAYXKCGAK@%3FLCNLAPH@JCDI%5EKDILCGs@AE@G%3FIQBCCGFG%3F%3FJGAA@KLKCCBSQKCABC@ACWJSDULI@EHG@@B/',
    attribution: 'Map data © OpenStreetMap contributors',
  },
  vector_map_image_preview: {
    src: 'https://tourpic-vector.maps.komoot.net/r/small/qps%5DqutH@ACGFAFl@LEHb@LHH@T%3FAYXKCGAK@%3FLCNLAPH@JCDI%5EKDILCGs@AE@G%3FIQBCCGFG%3F%3FJGAA@KLKCCBSQKCABC@ACWJSDULI@EHG@@B/',
    attribution: 'Map data © OpenStreetMap contributors',
  },
};

// Mock the global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        tours: [tour],
        links: [],
        page: { size: 20, number: 0 },
      }),
  }),
);

describe('ActivityFeed', () => {
  it('renders the loading state initially', () => {
    render(<ActivityFeed />);
    expect(screen.getByTestId('activity-feed')).toBeInTheDocument();
  });

  it('fetches and displays tours correctly', async () => {
    render(<ActivityFeed />);

    await waitFor(() =>
      expect(screen.getByTestId('activity-card')).toBeInTheDocument(),
    );
  });

  it('displays no tours when fetch returns an empty array', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ tours: [], page: { size: 20, number: 0 } }),
    });

    render(<ActivityFeed />);

    await waitFor(() =>
      expect(screen.queryByTestId('activity-card-1')).not.toBeInTheDocument(),
    );
  });
});
