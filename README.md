# SoftUni GamesPlay app


## Workshop 4 - Deployment
1. Server Deployment (GCP Cloud Run) 
- [x] Register into GCP
- [x] Create project in GCP 
- [x] Install Docker
- [x] Create Dockerfile
- [x] Create Docker image 
`docker build -t softuni-practice-server .`
- [x] View docker image `docker images`
- [x] Start local container 
`docker run -p 8080:8080 softuni-practice-server`
- [x] Enable Artifact Registry
    `Allows us to host Docker Images or artifact form`
- [x] Change image name
    `docker tag softuni-practice-server europe-west4-docker.pkg.dev/softuni-games-play-480406/softuni-practice-server-repo/softuni-practice-server`
- [x] Install GCloud SDK `https://docs.cloud.google.com/sdk/docs/install-sdk#windows`
- [x] Init and Login `gcloud init` `gcloud login`
- [x] List available projects `gcloud project list`
- [x] Set default project `gcloud config set project softuni-games-play-480406`
- [x] Check current project `gcloud config get-value project`
- [x] Authorize GCloud for Docker `gcloud auth configure-docker europe-west4-docker.pkg.dev`
- [x] Deploy to cloud run `gcloud run deploy softuni-practice-server -- image europe-west4-docker.pkg.dev/softuni-games-play-480406/softuni-practice-server-repo/softuni-practice-server --min-instances 0 -- max-instances 1 --region europe-west4 --platform=managed --allow-unauthenticated`
- [] Authorize
2. Client Deployment
3. CI/CD