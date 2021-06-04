"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var app = express_1.default();
var accessToken = process.env.AZURE_ACCESS_TOKEN;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
if (accessToken == null || accessToken === '') {
    throw new Error('Please provide an access token');
}
else {
    console.log('token is present!');
}
var project = 'PPSSPP Generate Store Package'; //example
var organization = 'Nun-z';
app.get('/', function (request, response) {
    response.send('Server is starting.');
});
app.post('/', function (request, response) {
    var pipelineID = request.body.pipelineID; // alphanumeric
    var url = "https://dev.azure.com/" + organization + "/" + project + "/_apis/pipelines/" + pipelineID + "/runs?api-version=6.0-preview.1";
    var headers = {
        Authorization: "Basic " + Buffer.from("PAT:" + accessToken).toString('base64'),
        'X-TFS-FedAuthRedirect': 'Suppress',
    };
    var axiosInstance = axios_1.default.create({
        headers: headers,
    });
    console.log(axiosInstance.getUri);
    axiosInstance.post(url);
});
app.listen(8080);
