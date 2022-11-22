import { EleventyEdge, precompiledAppData } from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
  try {
    context.cookies.set({
			name: 'name1',
			value: `value1`,
			path: '/',
			httpOnly: true,
		});
    context.cookies.set({
			name: 'name2',
			value: `value2`,
			path: '/',
      maxAge: 10,
		});
    context.cookies.set({
			name: 'name3',
			value: `value3`,
			path: '/',
      secure: true,
		});
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      cookies: ['name1', 'name2', 'name3'],
    });
    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
