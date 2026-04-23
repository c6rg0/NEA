import { Request, Response, Router } from "express";

export function elseRouter(){
	const ROUTER = Router();

	// Triggers if content that doesn't exist (404) is requested,
	// also works if the user uses a URL path ID in a way that's 
	// unsupported.
	ROUTER.use((req: Request, res: Response, next: Function) => {
		return res.status(404).json({ error: 'Not Found' });
	});
	
	return ROUTER;
}

