import { useMantineColorScheme } from "@mantine/core";
import { Country } from "../data/data";

export function CountryMap({ country }: { country: Country }) {
  const colorScheme = useMantineColorScheme();
  const filter = colorScheme.colorScheme === "dark" ? "invert(0.8)" : "";

  return (
    <img
      src={`/svg_icons/${country.code}.svg`}
      alt="map"
      width={256}
      height={256}
      className="map"
      style={{
        filter,
      }}
    />
  );
}
