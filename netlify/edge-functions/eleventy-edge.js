import { EleventyEdge, precompiledAppData } from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
  try {
    const visitCount = parseInt(context.cookies.get("visitCount"), 10) || 0;
    console.log(`before`, visitCount, `after`, visitCount + 1);
    context.cookies.set({
			name: 'visitCount',
			value: `${visitCount + 1}`,
			path: '/',
			httpOnly: true,
			secure: true,
		});
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ['visitCount'],
    });
    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
