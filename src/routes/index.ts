//index.ts
import * as express from "express";

export = (() => {
    
    let router = express.Router();
          
    router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });
    
    return router;
})();
