export type Dog = {
  title: string;
  url: string;
};

type RedditDogResponse = {
  data: {
    children: Array<{
      data: {
        title: string;
        preview?: {
          images: Array<{
            resolutions: Array<{
              url: string;
            }>;
          }>;
        };
      };
    }>;
  };
};

/**
 * Get cute dog pictures.
 *
 * Interview note:
 * The original version forgot to return the fetch promise.
 * This async version returns Promise<Dog[]> so the component can await it.
 */
export const getDogs = async (length = 10): Promise<Dog[]> => {
  const response = await fetch(
    "https://img.cdn4dd.com/s/managed/interview/tps-dogs/api.json"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dog images");
  }

  const json: RedditDogResponse = await response.json();

  const dogs: Dog[] = [];

  json.data.children.forEach((child) => {
    const title = child.data.title;
    const url = child.data.preview?.images[0]?.resolutions[2]?.url;

    if (url) {
      dogs.push({
        title,
        url: url.replaceAll("&amp;", "&"),
      });
    }
  });

  return dogs.slice(0, length);
};