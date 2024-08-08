/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

// Define the paths
const dataFilePath = path.join(__dirname, "src/data/data.ts");
const svgDirectory = path.join(__dirname, "public/svg_icons");
const svgISOFilePath = path.join(__dirname, "svg_isos.txt");
const dataISOFilePath = path.join(__dirname, "data_isos.txt");
// Function to read SVG filenames
function getSVGFileNames() {
  return fs
    .readdirSync(svgDirectory)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", "")); // Remove .svg extension
}

// Function to extract ISO codes from data.ts
function extractISOFromData() {
  const data = fs.readFileSync(dataFilePath, "utf8");
  const isoCodes = [];

  // Basic regex to match ISO codes in the data.ts file
  const regex = /['"]([A-Z]{2})['"]/g;
  let match;

  while ((match = regex.exec(data)) !== null) {
    isoCodes.push(match[1]);
  }

  return isoCodes;
}

function writeISOToFile(isoCodes, filePath) {
  fs.writeFileSync(filePath, isoCodes.join("\n"), "utf8");
}

// Compare SVG filenames with ISO codes
function compareSVGsAndData() {
  const svgISOs = getSVGFileNames();
  const isoCodes = extractISOFromData();

  writeISOToFile(svgISOs, svgISOFilePath);
  writeISOToFile(isoCodes, dataISOFilePath);

  // Find SVGs that are missing from data
  const missingFromData = svgISOs.filter((name) => !isoCodes.includes(name));

  // Find ISO codes in data that do not have corresponding SVGs
  const missingSVGs = isoCodes.filter((code) => !svgISOs.includes(code));

  console.log("Missing SVGs (in data but not in SVG directory):", missingSVGs);
  console.log(
    "Extra SVGs (in SVG directory but not in data):",
    missingFromData
  );
  console.log("ISO codes from SVG names have been written to:", svgISOFilePath);
  console.log("ISO codes from data.ts have been written to:", dataISOFilePath);
}

// Run the comparison
compareSVGsAndData();

const iso3166Codes = [
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TZ",
  "UA",
  "UG",
  "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
];

const isoCodes = extractISOFromData();

const svgISOs = getSVGFileNames();

const verifyISO = (isoCodes, svgISOs) => {
  const validisoCodes = isoCodes.filter((code) => iso3166Codes.includes(code));
  const validSvgISOs = svgISOs.filter((code) => iso3166Codes.includes(code));

  console.log("Valid ISO codes from data:", validisoCodes);
  console.log("Valid ISO codes from SVG names:", validSvgISOs);

  const missingFromData = validSvgISOs.filter(
    (code) => !validisoCodes.includes(code)
  );
  const missingSVGs = validisoCodes.filter(
    (code) => !validSvgISOs.includes(code)
  );

  console.log("Missing SVGs (in data but not in SVG directory):", missingSVGs);
  console.log(
    "Extra SVGs (in SVG directory but not in data):",
    missingFromData
  );
};

verifyISO(isoCodes, svgISOs);
