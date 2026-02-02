// elo.ts

// get-elo and submit-elo will have to be made, 
// this is simply a prototype, but both will likely have
// overlaping algorithms (which is why I made this first)

import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('database/regex_problems.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

function probability(rating1: number, rating2: number) {
	return 1.0 / (1+ Math.pow(10, (rating1 - rating2) / 400.0));
}

function elo_update(rating1: number, rating2: number, k: number, outcome: number){
	// Elo algorithm
	let pb = probability(rating1, rating2);
	let pa = probability(rating2, rating1);
	
	rating1 = rating1 + k * (outcome - pa);
	rating2 = rating2 + k * ((1 - outcome) - pb);

	console.log("Updated elo ratings:")
	console.log("Rating1: ", rating1);
	console.log("Rating2: ", rating2);
	return;
}

router.post('/', (req, res) => {
	// Recieve elo ratings from POST or from database
	// retrieval:
	const placeholder  = req.body;

	let rating1: number = 1;
	let rating2: number = 2;
	const k: number = 30;
	let outcome: number = 1;

	elo_update(rating1, rating2, k, outcome);

});

export default router;
