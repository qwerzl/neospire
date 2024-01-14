import GhostContentAPI from "@tryghost/content-api";

export const useGhost = () => {
  return new GhostContentAPI({
    url: 'http://localhost:3000/api/ghost',
    // This is a fake key to fool the library. The library enforces 26 hex characters like a donkey.
    // Real key is read from env var in server/api/ghost/[...slug].ts
    // For safety. To get rid of those little hackers.
    key: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    version: "v5.0"
  })
}
