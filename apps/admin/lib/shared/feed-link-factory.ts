const API_KEY = process.env.FLEXOFFERS_API_KEY ?? "";

export const feedLinkFactory = (programId: number | string, feedId: string): string => {
  const url = new URL("https://content.flexlinks.com/ftp/downloadFeed");
  url.searchParams.set("programId", String(programId));
  url.searchParams.set("feedId", feedId);
  url.searchParams.set("filetype", "CSV");
  url.searchParams.set("apikey", API_KEY);
  return url.toString();
};
