import axios from "axios";
import md5 from "md5";

export const GET = async (req, res) => {
    const publicKey = process.env.NEXT_PUBLIC_MARVEL_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
            params: {
                ts: ts,
                apikey: publicKey,
                hash: hash,
            }
        });
        return new Response(JSON.stringify(response.data.data.results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching Marvel data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

