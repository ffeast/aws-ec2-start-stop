# AWS EC2 start/stop functions

It's been surprisingly hard to schedule AWS EC2 instances launches/stops. 
This repo contains a set of artifacts to make it working in 10 minutes for simple cases when you need to launch/terminate a few instances. The following installation guide describes how to end up having an instance launched on working days at 09:45 and terminating at 10:10.
Inspired by https://blog.goodmirek.com/periodically-start-and-stop-ec2-instance-bf25c01e68f1

## Installation
1. Create a new IAM policy `ec2_start_stop_policy` using `ec2_start_stop_policy.json`
2. Create a new IAM role `ec2_start_stop_role` using `ec2_start_stop_role.json`
3. Create a new lambda function `ec2-start`, use `ec2_start_stop_role` as the default execution role and `lambda/ec2-start/index.js` as source code. Put your instance id and region into the source code.
4. Create a new lambda function, use `ec2_start_stop_role` as the default execution role and `lambda/ec2-stop/index.js` as source code. Put your instance id and region into the source code
5. Create a new rule in CloudWatch rules `ec2-start`. Use `ec2_start_stop_role` and `ec2-start` function as a target. Use `45 9 ? * MON-FRI *` as a schedule expression
6. Create a new rule in CloudWatch rules `ec2-stop`. Use `ec2_start_stop_role` and `ec2-stop` function as a target. Use `10 10 ? * MON-FRI *` as a schedule expression
7. If you need hibernation instead of termination use `lambda/ec2-hibernate/index.js` at step 4

## Further enhancements
- make instance ids and region configurable
- make CloudFormation templates to do the job
