var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get file
router.get('/getfile/:filename', function(req, res, next) {
  	fs.readFile('./uploads/'+req.params.filename, (err, data) => {
	  if (err) { res.status(404).send('File not found.'); }
    else {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
	   res.end(data);
    }
	});
});

// File upload
router.get('/new', function(req, res) {
  res.render('./uploadfile.hbs', {
    pageTitle: 'Upload file'
  });
});

router.post('/new', function (req, res) {
	var imgObj = JSON.parse(req.body.imageFile);
	var imgName = imgObj.input.name;
	var imgData = imgObj.output.image;
	var base64Data = imgData.replace(/^data:image\/(png|jpeg|gif);base64,/, "");
	fs.writeFile("./uploads/"+imgName, base64Data, 'base64', function(err, data) {
	   if(err){ return res.send(err); }
	   res.redirect('/new');
	});
});

router.get('/now', function(req, res) {
  res.render('./uploadfilenow.hbs', {
    pageTitle: 'Upload file'
  });
});

router.post('/now', function (req, res) {
	if (!fs.existsSync(`./uploads`)){ fs.mkdirSync(`./uploads`); }
	var imgObj = JSON.parse(req.body.imageFile);
	var imgName = imgObj.input.name;
	var imgData = imgObj.output.image;
	var base64Data = imgData.replace(/^data:image\/(png|jpeg|gif);base64,/, "");
	fs.writeFile(`./uploads/${imgName}`, base64Data, 'base64', function(err, data) {
	   if(err){ return res.json(false); }
	   res.json(true);
	});
});

module.exports = router;