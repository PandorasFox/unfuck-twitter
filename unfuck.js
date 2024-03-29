const tracking_params = ["s", "t"];

function unfuck(request) {
	var unfuckedURL = new URL(request.url);
	if (tracking_params.some(unfuckedURL.searchParams.has, unfuckedURL.searchParams)) {
		tracking_params.forEach((e) => unfuckedURL.searchParams.delete(e));
		console.log("Removed twitter tracking");
		return {
			redirectUrl: unfuckedURL.toString()
		}
	}
};

browser.webRequest.onBeforeRequest.addListener(
	unfuck,
	{
		urls: [
			"*://*.twitter.com/*/status/*",
			"*://*.x.com/*/status/*"
		],
		types: ["main_frame"],
	},
	["blocking"]
);
