import express from 'express';
import { addData,updateData,countApi,getData } from '../controller/dataController.js';
const router = express.Router();

router.get('/get',getData)
router.post('/add', addData);
router.put('/update/:id', updateData);
router.get('/count',countApi);
router.use((req, res, next) => {
    if (req.url.startsWith('/add')) {
      addCount++;
    } else if (req.url.startsWith('/update')) {
      updateCount++;
    }
    next();
  });



export default router;