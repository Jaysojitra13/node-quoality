
### How long did you spend on the coding test?
 - 7-8 Hours
### What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
 - I would have used different database for different microservices.

### What was the most useful feature that was added to the latest version of your chosen language/framework? Please include a snippet of code that shows how you've used it.
 - I have used the cluster module to create child worker for scalability.

``` sh
if (cluster.isMaster) {
  // If traffic to this pod will increase in future then we can add more .fork(). Max number
  // of fork should be equeal to number of cores of cpu
  console.log(`Master ${process.pid} is running`);
  cluster.fork();
  cluster.fork();
} else {
  app.listen(process.env.HOTEL_SERVICE_PORT, () => {
    console.log(`Hotel Service is listening on port ${process.env.HOTEL_SERVICE_PORT}`);
    console.log(`Worker ${process.pid} started`);
  });
}
```
### How would you track down a performance issue in production? Have you ever had to do this?
- I'll create one email service which will send an email when any API throws and error. Yes, I have implemented the this email service to track down the production issue.