export type SportKey = "football" | "basketball" | "hockey" | "soccer";

export interface SportConfig {
  key: SportKey;
  label: string;
  order: number;
}

export interface PortfolioPhoto {
  id: string;
  sport: SportKey;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PortfolioCollection {
  sports: SportConfig[];
  photos: PortfolioPhoto[];
}

export const sports: SportConfig[] = [
  { key: "football", label: "Football", order: 0 },
  { key: "basketball", label: "Basketball", order: 1 },
  { key: "hockey", label: "Hockey", order: 2 },
  { key: "soccer", label: "Soccer", order: 3 },
];

const createPhotos = (
  sport: SportKey,
  label: string,
  filenames: string[],
): PortfolioPhoto[] =>
  filenames.map((filename, index) => ({
    id: `${sport}-${String(index + 1).padStart(2, "0")}`,
    sport,
    src: `/photos/${label}/${filename}`,
    alt: `${label} sports photograph ${index + 1} from Parker Hurst's portfolio.`,
  }));

// Keep ordering explicit here. Reorder filenames in these arrays as you continue culling.
export const photos: PortfolioPhoto[] = [
  ...createPhotos("football", "Football", [
    "MDVD0544-3.jpg",
    "MDVD1196.jpg",
    "MDVD0046-3.jpg",
    "MDVD9369.jpg",
    "MDVD1060.jpg",
    "MDVD9466.jpg",
    "MDVD0025-3.jpg",
    "MDVD0847.jpg",
    "MDVD9263.jpg",
    "I70A2793.jpg",
    "3D6A1389.jpg",
    "I70A2486.jpg",
    "MDVD0477-3.jpg",
    "MDVD0432.jpg",
    "MDVD0279.jpg",
    "MDVD0533.jpg",
    "3D6A1324.jpg",
  ]),
  ...createPhotos("basketball", "Basketball", [
    "MDVD1127-4.jpg",
    "MDVD6883.jpg",
    "280A1672.jpg",
    "MDVD2426.jpg",
    "280A1924.jpg",
    "MDVD5930.jpg",
    "MDVD9735.jpg",
    "MDVD6705.jpg",
    "MDVD1681.jpg",
    "MDVD6830.jpg",
    "280A2168.jpg",
    "MDVD1747-2.jpg",
    "MDVD9463.jpg",
    "MDVD2243.jpg",
    "MDVD1378.jpg",
    "280A6800.jpg",
    "MDVD2237.jpg",
    "MDVD1418-4.jpg",
    "MDVD6995.jpg",
    "280A3605.jpg",
  ]),
  ...createPhotos("hockey", "Hockey", [
    "MDVD0669-6.jpg",
    "MDVD0020.jpg",
    "MDVD3111-2.jpg",
    "MDVD0072-7.jpg",
    "MDVD0170-7.jpg",
    "MDVD2671.jpg",
    "1L4A3036.jpg",
    "IMG_0085-2.jpg",
    "MDVD2842.jpg",
  ]),
  ...createPhotos("soccer", "Soccer", [
    "MDVD7911.jpg",
    "MDVD7657.jpg",
    "MDVD7654-2.jpg",
    "MDVD8044-2.jpg",
    "MDVD8121.jpg",
    "MDVD7480-2.jpg",
  ]),
];

export const portfolioCollection: PortfolioCollection = {
  sports,
  photos,
};
