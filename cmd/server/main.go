package main

import (
	"context"
	"log"
	"net/http"
)

func main() {
	startServer(context.Background(), ":9000", "/web")
}

func startServer(ctx context.Context, serverAddress string, staticPath string) {
	serverErr := make(chan error)
	staticDirectory := http.Dir(staticPath)

	server := &http.Server{
		Addr:    serverAddress,
		Handler: http.FileServer(staticDirectory),
	}

	go func() {
		serverErr <- server.ListenAndServe()
	}()

	log.Printf("server started with an error: %#v", <-serverErr)
	log.Printf("shut-down server with an error: %#v", server.Shutdown(ctx))
}
