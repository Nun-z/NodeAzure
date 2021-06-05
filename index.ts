import express from "express";
import axios from 'axios';

const app = express();
const accessToken = process.env.AZURE_ACCESS_TOKEN;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (accessToken == null || accessToken === '') 
{
    throw new Error('Please provide an access token');
} 
else 
{
    console.log('token is present!');
}

app.get('/', (request, response) => {
    response.send('Server is starting.');
});

app.post('/', (request, response) => {
    //const pipelineID = process.env.TEST_VALUE;
    const pipelineID = request.body.pipelineID; // alphanumeric
    const project = request.body.project;
    const organization = request.body.organization;

    var url = `https://dev.azure.com/${organization}/${project}/_apis/pipelines/${pipelineID}/runs?api-version=6.0-preview.1`;
    url = encodeURI(url);

    const headers = {
        Authorization: `Basic ${Buffer.from(`PAT:${accessToken}`).toString('base64')}`,
        'X-TFS-FedAuthRedirect': 'Suppress',   
    };
    
    const axiosInstance = axios.create({
        headers: headers,
        
    });

    console.log(axiosInstance.getUri)
    axiosInstance.post(url, { source: "NodeAzure"})
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    });
 
app.listen(8080);