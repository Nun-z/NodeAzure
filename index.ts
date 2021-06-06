import express from "express";
import axios from 'axios';

const app = express();
const accessToken = process.env.AZURE_ACCESS_TOKEN; // you will need your own token to use this

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (accessToken == null || accessToken === '') {
    throw new Error('Invalid access token');
} 

app.get('/', (request, response) => {
    response.send('Server is starting.');
});

app.post('/', (request, response) => {
    //const pipelineID = process.env.TEST_VALUE;
    const pipelineID = request.body.pipelineID; // alphanumeric
    const project = request.body.project;
    const organization = request.body.organization;

    const url = `https://dev.azure.com/${organization}/${project}/_apis/pipelines/${pipelineID}/runs?api-version=6.0-preview.1`;

    const headers = {
        Authorization: `Basic ${Buffer.from(`PAT:${accessToken}`).toString('base64')}`,
        'X-TFS-FedAuthRedirect': 'Suppress',   
    };
    
    const axiosInstance = axios.create({
        headers: headers,
    });

    console.log(axiosInstance.getUri)
    try {
        axiosInstance.post(url, { source: "NodeAzure"});
        response.send("Request was sent but will not be awaited");
    }
    catch(error) {
        response.send(error);
    }
});
 
app.listen(8080);
