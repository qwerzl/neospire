import GhostContentAPI from "@tryghost/content-api";

export const useGhost = () => {
  const config = useRuntimeConfig()
  return new GhostContentAPI({
    url: `${config.public.baseUrl}/api/ghost`,
    // This is a fake key to fool the library. The library enforces 26 hex characters like a donkey.
    // Real key is read from env var in server/api/ghost/[...slug].ts
    // For safety. To get rid of those little hackers.
    key: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    version: "v5.0"
  })
}
