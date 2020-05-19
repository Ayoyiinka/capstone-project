# Udacity Cloud Developer
## My own Instagram!

###  Unit tests

Each module has it's own unit testing command. You have to go inside each directory and run
`npm install`, if the dependencies are not installed then `npm test`.
The coverage is still small, but it's intended to increase it soon.

### Running locally with Docker

#### Step by step

1. Set DOCKER_USER and DOCKER_PASS environment variables in travis-ci

2. Check the deployment folder to change the image key in files to the name of the equivalent or preferred docker hub repository.

3. Push changes to github. Wait till travis-ci build is completed and check docker hub for all the images.

4. You should define these envinronment variables locally:
  - POSTGRESS_USERNAME
  - POSTGRESS_PASSWORD
  - POSTGRESS_DB
  - POSTGRESS_HOST
  - AWS_REGION
  - AWS_PROFILE
  - AWS_BUCKET
  - JWT_SECRET

#### Set up envinronment variables

Set up the envinroment variables properly in
`./deployment/k8s/env-configmap.yaml`.

Then you should set your secrets in `env-secrets.yaml` and `aws-secret.yaml`.
These secrets should be stored as base64 strings. You could use `echo yourstring | base64` to
convert a string to base64 encoded or `base64 -in /path/to/file` to convert a file.

5. Create a cluster and nodes on AWS 
#### Load environment variables, deployments and services

Execute `kubectl apply -f ./deployment/k8s/.` to load all configmaps, secrets,
deployments and services.

You could run `kubectl get all` to check if everything is running.

#### Port forwarding

To connect your localhost ports with the containers execute:
```
kubectl port-forward service/frontend 8100:8100
kubectl port-forward service/reverseproxy 8080:8080
```

See the app running in `localhost:8100`.