import { useCallback, useEffect, useRef, useState } from "react";
import { parseLinkHeader } from "./parseLinkHeader";

export default function App() {
  const [photos, setPhotos] = useState();
  const [isLoading, setIsLoading] = useState(undefined);
  const nextPhotoUrlRef = useRef();

  const LIMIT = 50;

  async function fetchPhotos(url, { overwrite = false } = {}) {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      const res = await fetch(url);
      // console.log("res :", res);
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get("Link")).next;

      // console.log("next photo: ", nextPhotoUrlRef.current);
      const photos = await res.json();

      // console.log(photos);
      if (overwrite) {
        setPhotos(photos);
      } else {
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...photos];
        });
      }

      // console.log("photos: ", photos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(photos);

  const imageRef = useCallback((image) => {
    if (image == null || nextPhotoUrlRef.current == null) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPhotos(nextPhotoUrlRef.current);
        observer.unobserve(image);
      }
    });
    observer.observe(image);
  }, []);

  useEffect(() => {
    fetchPhotos(
      `http://localhost:3000/photos-short-list?_page=1&_limit=${LIMIT}`,
      {
        overwrite: true,
      }
    );
  }, []);

  return (
    <>
      <div className="grid">
        {photos &&
          photos.map((photo, index) => {
            return (
              <img
                key={photo.id}
                src={photo.url}
                ref={index === photos.length - 1 ? imageRef : undefined}
              />
            );
          })}
        {isLoading &&
          Array.from({ length: LIMIT }, (_, index) => index).map((n) => {
            return (
              <div key={n} className="skeleton">
                Loading...
              </div>
            );
          })}
      </div>
    </>
  );
}
