docker build -t node-serve:latest .

 docker run --name node-serve:latest  -d -p 7001:7001 node-serve:latest