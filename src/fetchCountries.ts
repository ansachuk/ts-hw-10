const BASIC_URL = "https://restcountries.com/v3.1/";

type Flags = {
	png: string;
	svg: string;
	alt: string;
};

type Names = {
	common: string;
	official: string;
	nativeName: {};
};

export type Country = {
	flags: Flags;
	name: Names;
	capital: string[];
	languages: {};
	population: number;
};

export const fetchCountries = async (name: string): Promise<Country[]> => {
	try {
		const res = await fetch(`${BASIC_URL}name/${name}?fields=name,capital,population,flags,languages`);

		if (!res.ok) {
			throw new Error(res.statusText);
		}

		return await res.json();
	} catch (e: unknown) {
		throw new Error("error");
	}
};
