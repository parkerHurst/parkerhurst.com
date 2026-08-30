export type SportKey =
  | "football"
  | "baseball"
  | "basketball"
  | "hockey"
  | "lacrosse"
  | "soccer"
  | "indycar";

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
  { key: "baseball", label: "Baseball", order: 1 },
  { key: "basketball", label: "Basketball", order: 2 },
  { key: "hockey", label: "Hockey", order: 3 },
  { key: "lacrosse", label: "Lacrosse", order: 4 },
  { key: "soccer", label: "Soccer", order: 5 },
  { key: "indycar", label: "INDYCAR", order: 6 },
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
    alt: `${label} ${index + 1} from Parker Hurst's portfolio.`,
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
    "MDVD0477-3.jpg",
    "MDVD0432.jpg",
    "MDVD0279.jpg",
    "MDVD0533.jpg",
    "3D6A1324.jpg",
  ]),
  ...createPhotos("baseball", "Baseball", [
    "MDVD6696.jpg",
    "MDVD6452.jpg",
    "MDVD6653.jpg",
    "MDVD8181.jpg",
    "MDVD8035.jpg",
    "MDVD7908.jpg",
    "MDVD7756.jpg",
    "MDVD7681.jpg",
    "MDVD8392.jpg",
    "MDVD6655.jpg",
    "MDVD6819.jpg",
    "MDVD6837.jpg",
    "MDVD7000.jpg",
    "MDVD7041.jpg",
    "MDVD7117.jpg",
    "MDVD7173.jpg",
    "MDVD7177.jpg",
    "MDVD7211.jpg",
    "MDVD7231.jpg",
  ]),
  ...createPhotos("basketball", "Basketball", [
    "MDVD1127-4.jpg",
    "MDVD6883.jpg",
    "280A1672.jpg",
    "280A1924.jpg",
    "MDVD5930.jpg",
    "MDVD9735.jpg",
    "MDVD6705.jpg",
    "MDVD1681.jpg",
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
  ...createPhotos("lacrosse", "Lacrosse", [
    "SNY03681.jpg",
    "SNY04338.jpg",
    "SNY07317.JPG",
    "SNY08368.JPG",
    "SNY06074.jpg",
    "SNY04675.jpg",
    "SNY01094.jpg",
    "SNY08850.jpg",
    "SNY08930.jpg",
    "SNY09261.jpg",
  ]),
  ...createPhotos("indycar", "INDYCAR", [
    "A9_09735.JPG",
    "A9_00444.JPG",
    "A9_00676.JPG",
    "A9_03416.JPG",
    "A9_03764.JPG",
    "A9_04750.JPG",
  ]),
];

export const portfolioCollection: PortfolioCollection = {
  sports,
  photos,
};
