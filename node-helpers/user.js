var fs = require('fs');
var url = require('url');
var path = require('path');


module.exports = {
	saveFormat: function(request, response) {
		var excludeDetails = request.body;
		var excludePath = path.join(path.normalize("./public/config/"),"format.json");
		fs.writeFileSync(excludePath, excludeDetails.content, 'utf8');
		response.send("exclude json updated");
	},
	saveUser: function(request, response) {
		var excludeDetails = request.body;
		var excludePath = path.join(path.normalize("./public/data/"),"user.json");
		fs.writeFileSync(excludePath, excludeDetails.content, 'utf8');
		response.send("exclude json updated");
	}
};



