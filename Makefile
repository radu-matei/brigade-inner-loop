BRIGADE_PROJECT = brigade-785c10316b4177afa40cb870cc417a96eae3931120c80b71782c29
BRIGADE_NAMESPACE = brigade

DOCKERHUB_USER = radumatei
IMAGE = brigade-inner-loop
#TAG = $(shell git describe --tags --always)
TAG = edge

.PHONY: ci
ci:
	docker build -t $(DOCKERHUB_USER)/$(IMAGE):$(TAG) .
	brig run -f brigade.js $(BRIGADE_PROJECT) --namespace $(BRIGADE_NAMESPACE) --payload payload.json