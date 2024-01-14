import { withQuery, getQuery } from "ufo";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  let target = `${config.ghostUrl}/${event.context.params!.slug}`;
  if (event.path.includes("?")) {
    const query = getQuery(event.path);
    target = withQuery(target, query);
  }
  target = withQuery(target, {key: config.ghostContentKey});
  return proxyRequest(
    event,
    target,
    // { headers: { "X-API-KEY": config.API_TOKEN },  }
  )
})
