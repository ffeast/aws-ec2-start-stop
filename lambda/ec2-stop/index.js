var AWS = require('aws-sdk');
exports.handler = function(event, context) {
    var ec2 = new AWS.EC2({region: 'your-region-id'});
    ec2.stopInstances({InstanceIds : ['i-your-instance-id']}, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
        context.done(err, data);
    });
};
