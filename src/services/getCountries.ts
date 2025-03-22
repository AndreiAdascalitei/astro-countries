export async function getCountries(count?: number): Promise<{ countries: any[] | null; error: string | null }> {
    try {
        const res = await fetch("https://restcountries.com/v3.1/region/europe?fields=name,flags,capital,languages,landlocked");
    
        if (!res.ok) {
            return {
                countries: [],
                error: `API Error: ${res.status} - ${res.statusText}`,
            };
        } 

        const countries = await res.json();

        if (!Array.isArray(countries)) {
            return {
            countries: [],
            error: "Unexpected API response format. Expected an array.",
            };
        }

        if(count) {
            const shuffled = shuffleArray(countries).slice(0, count);
            return { countries: shuffled, error: null };
        } else {
            return { countries: countries, error: null };
        } 
    } catch (err: any) {
        return {
            countries: [],
            error: `Network Error: ${err?.message || "Unknown error occurred while fetching countries."}`,
        };
    }
}

// In order to pick random countries I need to shuffle the array. Choosed an O(n) solution
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}