import {
  calculateSpeed,
  convertMetersToKm,
  formatDate,
  formatNumberWithCommas,
  formatSeconds,
} from './utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('should format a date string correctly', () => {
      const dateString = '2025-01-25T00:00:00Z';
      const formattedDate = formatDate(dateString);
      expect(formattedDate).toBe('January 25, 2025');
    });

    it('should handle invalid date string gracefully', () => {
      const invalidDateString = 'invalid-date';
      const formattedDate = formatDate(invalidDateString);
      expect(formattedDate).toBe('Invalid Date');
    });
  });

  describe('formatSeconds', () => {
    it('should format seconds to hh:mm correctly', () => {
      const formattedTime = formatSeconds(3661); // 1 hour, 1 minute
      expect(formattedTime).toBe('01:01');
    });

    it('should handle less than one hour correctly', () => {
      const formattedTime = formatSeconds(150); // 2 minutes and 30 seconds
      expect(formattedTime).toBe('00:02');
    });

    it('should handle zero seconds correctly', () => {
      const formattedTime = formatSeconds(0); // No time
      expect(formattedTime).toBe('00:00');
    });
  });

  describe('convertMetersToKm', () => {
    it('should convert meters to kilometers correctly', () => {
      const kilometers = convertMetersToKm(1500);
      expect(kilometers).toBe('1.50');
    });

    it('should handle 0 meters correctly', () => {
      const kilometers = convertMetersToKm(0);
      expect(kilometers).toBe('0.00');
    });

    it('should handle large distances correctly', () => {
      const kilometers = convertMetersToKm(1000000); // 1000 kilometers
      expect(kilometers).toBe('1000.00');
    });
  });

  describe('calculateSpeed', () => {
    it('should calculate speed correctly', () => {
      const speed = calculateSpeed(10000, 3600); // 10 km in 1 hour
      expect(speed).toBe('10.00');
    });

    it('should handle zero distance correctly', () => {
      const speed = calculateSpeed(0, 3600); // 0 km in 1 hour
      expect(speed).toBe('0.00');
    });

    it('should handle zero time correctly', () => {
      const speed = calculateSpeed(10000, 0); // Should not be possible, handle gracefully
      expect(speed).toBe('Infinity'); // Or handle the error case appropriately
    });
  });

  describe('formatNumberWithCommas', () => {
    it('should format numbers with commas correctly', () => {
      const formattedNumber = formatNumberWithCommas(1000000);
      expect(formattedNumber).toBe('1,000,000');
    });

    it('should handle numbers without a comma correctly', () => {
      const formattedNumber = formatNumberWithCommas(999);
      expect(formattedNumber).toBe('999');
    });

    it('should handle negative numbers correctly', () => {
      const formattedNumber = formatNumberWithCommas(-1000000);
      expect(formattedNumber).toBe('-1,000,000');
    });
  });
});
