const unfuck_expression = new RegExp(/&?[st]=\w+/, 'g');

function unfuck(request) {
	var unfuckedURL = new URL(request.url);
	if (unfuckedURL.href.match(unfuck_expression) != null) {
		unfuckedURL.search = unfuckedURL.search.replaceAll(unfuck_expression, "");
		return {
			redirectUrl: unfuckedURL.href
		}
	}
};

browser.webRequest.onBeforeRequest.addListener(
	unfuck,
	{
		urls: ["*://*.twitter.com/*/status/*"],
		types: ["main_frame"],
		
	},
	["blocking"]
);
