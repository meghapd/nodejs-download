var fs = require('fs'),
    url = require('url')
    ProgressBar = require('progress');

var protocol ;

var content = new Buffer([]);
var dataDownloaded = 0,
    percentDownloaded,
    fileSize;

var requestfile = process.argv[2];
var filename = requestfile.split('/').pop();

if (requestfile.indexOf('https:')=== 0){
  protocol= require('https')}
  else if
   (requestfile.indexOf('http:')=== 0)
 {
  protocol = require('http')

}


var request = protocol.get(requestfile, function(response){
  // console.log(response.headers)

  fileSize = parseInt(response.headers['content-length']);
  debugger;
  if( !(typeof fileSize === 'number') || fileSize == NaN){
    console.log('File can not be downloaded');
    process.exit(-1);
  }

  var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: fileSize
  });

  console.log('File size is ' + fileSize);

  response.on('data', function(data){
    content = Buffer.concat([content,data]);
    dataDownloaded += data.toString().length;
    percentDownloaded = ((dataDownloaded/fileSize)*100).toFixed(2  );
    bar.tick(data.toString().length);
  });



  response.on('end', function(){
    fs.writeFile(filename, content, function(err){
      if(err){
        console.log(err)
      }
      console.log('saved')
    });
  });


});
