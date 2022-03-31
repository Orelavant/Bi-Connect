import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString(
	"ascii"
);
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString(
	"ascii"
);

export const signJWT = (
	payload: Object,
	options?: jwt.SignOptions | undefined
) => {
	return jwt.sign(payload, privateKey, {
		...(options && options),
		algorithm: "RS256",
	});
};

export const verifyJWT = <T>(token: string): T => {
	try {
		const decoded = jwt.verify(token, publicKey) as T;
		return decoded;
	} catch (err) {
		return null;
	}
};
