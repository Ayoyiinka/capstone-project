<p align="center">
  <a href="https://travis-ci.com/alvimm/udacity-project-refactor-udagram"><img src="https://travis-ci.com/alvimm/udacity-project-refactor-udagram.svg?branch=master" alt="Build status" /></a>
</p>


# Udacity Cloud Developer
## My own Instagram!

### Unit tests

Each module has it's own unit testing command. You have to go inside each directory and run
`npm install`, if the dependencies are not installed then `npm test`.
The coverage is still small, but it's intended to increase it soon.

### Running locally with Docker

#### Step by step

1. You should define these envinronment variables locally:
  - POSTGRESS_USERNAME
  - POSTGRESS_PASSWORD
  - POSTGRESS_DB
  - POSTGRESS_HOST
  - AWS_REGION
  - AWS_PROFILE
  - AWS_BUCKET
  - JWT_SECRET

2. Build images with:
`docker-compose -f ./deployment/docker/docker-compose-build.yaml build --parallel`
1. Then run with:
`docker-compose -f ./deployment/docker/docker-compose.yaml up`
4. See the app in `localhost:8100`.

#### Docker hub images

The project's images are available at Docker Hub under these names:
- [alvim/reverseproxy](https://hub.docker.com/repository/docker/alvim/reverseproxy)
- [alvim/udacity-restapi-feed](https://hub.docker.com/repository/docker/alvim/udacity-restapi-feed)
- [alvim/udacity-frontend](https://hub.docker.com/repository/docker/alvim/udacity-frontend)
- [alvim/udacity-restapi-user](https://hub.docker.com/repository/docker/alvim/udacity-restapi-user)

### Running with Kubernetes

#### Configure cluster

In order to run this project properly with Kubernetes, you should previously configure your
cluster. I recommend using Kubeone for this and follow [these instructions](https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md).

#### Set up envinronment variables

Set up the envinroment variables properly in
`./deployment/k8s/env-configmap.yaml`.

Then you should set your secrets in `env-secrets.yaml` and `aws-secret.yaml`.
These secrets should be stored as base64 strings. You could use `echo yourstring | base64` to
convert a string to base64 encoded or `base64 -in /path/to/file` to convert a file.

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