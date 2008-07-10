importModule('helma.app', 'app');
importFromModule('helma.simpleweb', 'handleRequest');
importModule('helma.logging', 'logging');
var log = logging.getLogger(__name__);

importModule('modules.http', 'http');


function main() {
   app.start();
   log.info('Welcome to HTTP NG! ^^');
}


function main_action() {
   var client = http.getClient();

   try {
      var response = client.execReq('http://apache.org/foundation');
      res.debug(response.getStatusLine());
      res.debug(response.getBody());
   } catch (e) {
      log.error('Request failed: ' + e.toString());
   }
}
