import { GetStations, CalculateDistance } from './station'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  // 1. 可能錯在wrap不知道怎麼用
  // 2. 可能錯在get後面的參數
  
  app.get('/api/getStations',wrap(GetStations));
  app.get('/api/calculateDistance',wrap(CalculateDistance));
  
  // set proper api path and connect the path with wrap(function)
  // coding here ...
  // '/api/getStations'
  // '/api/calculateDistance'
}

export default routes


// import { Router } from 'express';
// import scoreCardRouter from './scoreCard';

// const router = Router();

// router.use('/', scoreCardRouter);

// export default router;