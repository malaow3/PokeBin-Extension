// background.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	if (request.action === "injectScript") {
// 		window.PokeBinCurTeamData = {
// 			name: window.room.curTeam.name,
// 			format: window.room.curTeam.format,
// 			gen: window.room.curTeam.gen,
// 			team: window.Storage.exportTeam(
// 				window.room.curTeam.team,
// 				window.room.curTeam.gen,
// 				false,
// 			),
// 			author: window.app.user.attributes.name,
// 		};
// 		console.log(window.PokeBinCurTeamData);
// 		// window.postMessage(
// 		// 	JSON.stringify({
// 		// 		type: "customTeamMsg",
// 		// 		curTeam: window.PokeBinCurTeamData,
// 		// 	}),
// 		// 	"*",
// 		// );
// 	}
// });
