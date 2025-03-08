import type { Image } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ImageGrid.module.css';

const PADDING_GUTTER = 64;
const MARGINS_BETWEEN_IMAGES = 10;
const VERTICAL_GAP_BETWEEN_IMAGES = 6;
const SMALL_HEIGHT = 225;

export const ImageGrid = ({ images }: { images: Image[] }) => {
  const [imageWidth, setImageWidth] = useState(500);

  useEffect(() => {
    const calculateImageWidth = () => {
      const screenWidth = window.innerWidth;
      setImageWidth(screenWidth / 2 - PADDING_GUTTER - MARGINS_BETWEEN_IMAGES);
    };

    calculateImageWidth();
    window.addEventListener('resize', calculateImageWidth);
    return () => window.removeEventListener('resize', calculateImageWidth);
  }, []);

  const getImageUrl = useCallback(
    (image: Image, width: number, height: number) =>
      image.src
        .replace('{width}', width.toString())
        .replace('{height}', height.toString()),
    [],
  );

  const rows = useMemo(() => {
    const groupedRows: Image[][] = [];
    for (let i = 0; i < images.length; i += 3) {
      groupedRows.push(images.slice(i, i + 3));
    }
    return groupedRows;
  }, [images]);

  const renderRow = (rowImages: Image[]) => {
    switch (rowImages.length) {
      case 1:
        return (
          <img
            src={getImageUrl(rowImages[0], imageWidth * 2, SMALL_HEIGHT * 2)}
            alt=''
            className={styles.fullWidth}
          />
        );

      case 2:
        return (
          <div className={styles.twoImages}>
            {rowImages.map((image, index) => (
              <img
                key={image.id}
                src={getImageUrl(image, imageWidth, SMALL_HEIGHT * 2)}
                alt={`Half Width ${index + 1}`}
                className={styles.halfWidth}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className={styles.threeImages}>
            <img
              src={getImageUrl(rowImages[0], imageWidth, SMALL_HEIGHT * 2)}
              alt='Large'
              className={styles.largeImage}
            />
            <div className={styles.smallImages}>
              {rowImages.slice(1).map((image, index) => (
                <img
                  key={image.id}
                  src={getImageUrl(
                    image,
                    imageWidth,
                    SMALL_HEIGHT - VERTICAL_GAP_BETWEEN_IMAGES / 2,
                  )}
                  alt={`Small ${index + 1}`}
                  className={styles.smallImage}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.imageGrid}>
      {rows.map((rowImages, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} className={styles.row}>
          {renderRow(rowImages)}
        </div>
      ))}
    </div>
  );
};
