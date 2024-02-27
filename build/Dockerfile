FROM golang:1.22-alpine3.18 AS builder
WORKDIR /app
COPY . ./
RUN apk update && apk add --no-cache git
RUN go mod download
RUN CGO_ENABLED=0  go build -o /usr/bin/server ./cmd/server
############################### SECOND STAGE ###############################
FROM alpine
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
COPY --from=builder /app/web /web
COPY --from=builder /usr/bin/server /usr/bin/server
EXPOSE 9000
CMD ["server"]
