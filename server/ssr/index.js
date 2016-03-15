import {Router} from "express";
import {match} from "react-router";
import createHistory from "history/lib/createMemoryHistory";
import createRoutes from "../../common/routes";
import bootup from "./bootup";

const router = Router();

router.use((req, res, next) => {
  const history = createHistory();
  const routes = createRoutes(history);
  const location = history.createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps) {
      let initialData;

      // TODO: Make this a higher-level abstraction
      switch (renderProps.location.pathname) {
        case '/':
          initialData = {app: {title: 'Isomorphic with SSR'}};
          break;
        default:
          initialData = {app: {}};
          break;
      }

      res.status(200).end(bootup(renderProps, initialData)({
        lang: 'zh-CN',
        title: 'SSR',
      }));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

export default router;
