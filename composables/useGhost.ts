import GhostContentAPI from "@tryghost/content-api";

export const useGhost = () => {
  return new GhostContentAPI({
    url: 'http://localhost:3000/api/ghost',
    key: 'eda34c69df85b9ddf91861f0ed',
    version: "v5.0"
  })
}
