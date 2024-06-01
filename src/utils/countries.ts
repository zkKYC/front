// import { promises as fs } from "fs";
import { parseStringPromise } from "xml2js";

const filePath = "./countries.xml";

export async function fetchAndParseXML() {
  try {
    // const xmlData = fs.readFile(filePath, "utf-8");

    const response = await fetch("./countries.xml");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const xmlData = await response.text();
    const result = await parseStringPromise(xmlData);

    // const result = await parseStringPromise(xmlData);

    const countryList = result["country-list"].country;
    const countryIsoMapping: Record<string, string> = {};

    countryList.forEach((country: any) => {
      const name = country.name[0];
      const isoCode = country.iso[0];
      countryIsoMapping[name] = isoCode;
    });

    //console.log(countryIsoMapping);

    return countryIsoMapping;
  } catch (error) {
    console.error("Error reading or parsing XML:", error);
    return {};
  }
}

fetchAndParseXML();
