importJar('http/apache-mime4j-0.3.jar');
importJar('http/commons-codec-1.3.jar');
importJar('http/commons-io-1.2.jar');
importJar('http/commons-logging-1.1.1.jar');
importJar('http/httpcore-4.0-beta2.jar');
importJar('http/httpcore-nio-4.0-beta2.jar');
importJar('http/httpmime-4.0-alpha4.jar');
importJar('http/httpclient-4.0-alpha4.jar');

importModule('helma.rhino', 'rhino');
importModule('helma.logging', 'logging');
var log = logging.getLogger(__name__);

var __shared__ = true;

var client;


function getClient() {
   if (!client) {
      this.initClient();
   }

   return client;
}


function initClient() {
   var supportedSchemes = new org.apache.http.conn.scheme.SchemeRegistry();
   var socketFactory = org.apache.http.conn.scheme.PlainSocketFactory.getSocketFactory();
   supportedSchemes.register(new org.apache.http.conn.scheme.Scheme('http', socketFactory, 80));

   var params = new org.apache.http.params.BasicHttpParams();
   org.apache.http.params.HttpProtocolParams.setVersion(params, org.apache.http.HttpVersion.HTTP_1_1);
   org.apache.http.params.HttpProtocolParams.setContentCharset(params, 'UTF-8');
   org.apache.http.params.HttpProtocolParams.setUseExpectContinue(params, true);

   var clientConnMgr = new org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager(params, supportedSchemes);

   client = new org.apache.http.impl.client.DefaultHttpClient(clientConnMgr, params);
   log.info('HTTP client initialized.');
}


var HttpClient = rhino.extendJavaClass(org.apache.http.impl.client.DefaultHttpClient);

HttpClient.prototype.execReq = function (uri, method) {
   var request = new org.apache.http.client.methods.HttpGet(uri);

   if (method == 'POST' || method == 'post') {
      request = new org.apache.http.client.methods.HttpPost(uri);
   } else if (method == 'PUT' || method == 'put') {
      request = new org.apache.http.client.methods.HttpPut(uri);
   } else if (method == 'DELETE' || method == 'delete') {
      request = new org.apache.http.client.methods.HttpDelete(uri);
   }

   return this.execute(request);
}


var HttpResponse = rhino.extendJavaClass(org.apache.http.message.BasicHttpResponse);

HttpResponse.prototype.getBody = function () {
   return org.apache.http.util.EntityUtils.toString(this.getEntity());
}
