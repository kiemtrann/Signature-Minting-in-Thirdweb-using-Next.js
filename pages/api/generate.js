// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

export default async function handler(req, res) {
	if (req.method !== 'POST')
		return res.status(400).json({ message: 'Invalid request method' });

	const {
		body: { name, description, image },
	} = req;

	const sdk = new ThirdwebSDK(
		new ethers.Wallet(
			process.env.WALLET_PRIVATE_KEY,
			ethers.getDefaultProvider('https://matic-mumbai.chainstacklabs.com')
		)
	);

	const collection = await sdk.getNFTCollection(
		process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
	);

	const signature = await collection.signature.generate({
		metadata: {
			name,
			description,
			image,
		},
	});

	res.json({ message: 'Signature generated successfully', signature });
}
